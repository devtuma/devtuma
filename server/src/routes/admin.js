const express = require('express');
const db = require('../database');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');
const router = express.Router();

// Todas as rotas admin requerem autenticação de admin
router.use(authMiddleware, adminMiddleware);

// Dashboard - estatísticas gerais
router.get('/dashboard', async (req, res) => {
  try {
    const stats = await db.get(`
      SELECT
        COUNT(DISTINCT u.id) as totalUsers,
        COUNT(DISTINCT CASE WHEN u.role = 'admin' THEN u.id END) as totalAdmins,
        COUNT(DISTINCT p.id) as totalProposals,
        COUNT(DISTINCT CASE WHEN p.status = 'active' THEN p.id END) as activeProposals,
        COUNT(DISTINCT t.id) as totalTransactions,
        COUNT(DISTINCT CASE WHEN t.status = 'pending' THEN t.id END) as pendingTransactions,
        COUNT(DISTINCT CASE WHEN t.status = 'payment_sent' THEN t.id END) as awaitingConfirmation,
        COUNT(DISTINCT CASE WHEN t.status = 'completed' THEN t.id END) as completedTransactions,
        COALESCE(SUM(CASE WHEN t.status = 'completed' THEN t.totalAmount ELSE 0 END), 0) as totalVolume
      FROM users u
      LEFT JOIN proposals p ON 1=1
      LEFT JOIN transactions t ON 1=1
    `);

    res.json(stats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar estatísticas' });
  }
});

// Listar todos os usuários
router.get('/users', async (req, res) => {
  try {
    const users = await db.query(`
      SELECT id, name, email, phone, country, document, role, verified, rating, totalTransactions, createdAt
      FROM users
      ORDER BY createdAt DESC
    `);
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
});

// Listar todas as transações (com filtros)
router.get('/transactions', async (req, res) => {
  try {
    const { status, search } = req.query;

    let query = `
      SELECT t.*,
        sender.name as senderName, sender.email as senderEmail, sender.country as senderCountry,
        receiver.name as receiverName, receiver.email as receiverEmail, receiver.country as receiverCountry,
        p.recipientName, p.recipientEmail
      FROM transactions t
      LEFT JOIN users sender ON t.senderId = sender.id
      LEFT JOIN users receiver ON t.receiverId = receiver.id
      LEFT JOIN proposals p ON t.proposalId = p.id
      WHERE 1=1
    `;

    const params = [];

    if (status) {
      query += ' AND t.status = ?';
      params.push(status);
    }

    if (search) {
      query += ' AND (sender.name LIKE ? OR receiver.name LIKE ? OR t.id LIKE ?)';
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    query += ' ORDER BY t.createdAt DESC LIMIT 100';

    const transactions = await db.query(query, params);
    res.json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar transações' });
  }
});

// Detalhes de uma transação específica
router.get('/transactions/:id', async (req, res) => {
  try {
    const transaction = await db.get(`
      SELECT t.*,
        sender.name as senderName, sender.email as senderEmail, sender.phone as senderPhone, sender.country as senderCountry,
        receiver.name as receiverName, receiver.email as receiverEmail, receiver.phone as receiverPhone, receiver.country as receiverCountry,
        p.recipientName, p.recipientEmail, p.recipientPhone, p.recipientDocument
      FROM transactions t
      LEFT JOIN users sender ON t.senderId = sender.id
      LEFT JOIN users receiver ON t.receiverId = receiver.id
      LEFT JOIN proposals p ON t.proposalId = p.id
      WHERE t.id = ?
    `, [req.params.id]);

    if (!transaction) {
      return res.status(404).json({ error: 'Transação não encontrada' });
    }

    res.json(transaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar transação' });
  }
});

// Confirmar pagamento do remetente
router.post('/transactions/:id/confirm-sender-payment', async (req, res) => {
  try {
    const { notes } = req.body;

    const transaction = await db.get('SELECT * FROM transactions WHERE id = ?', [req.params.id]);

    if (!transaction) {
      return res.status(404).json({ error: 'Transação não encontrada' });
    }

    await db.run(`
      UPDATE transactions
      SET senderPaymentConfirmed = 1,
          adminNotes = ?,
          updatedAt = CURRENT_TIMESTAMP
      WHERE id = ?
    `, [notes || '', req.params.id]);

    // Verificar se ambos os pagamentos foram confirmados
    const updated = await db.get('SELECT * FROM transactions WHERE id = ?', [req.params.id]);
    if (updated.senderPaymentConfirmed && updated.receiverPaymentConfirmed) {
      await db.run('UPDATE transactions SET status = "completed", updatedAt = CURRENT_TIMESTAMP WHERE id = ?', [req.params.id]);

      // Atualizar contador de transações dos usuários
      await db.run('UPDATE users SET totalTransactions = totalTransactions + 1 WHERE id IN (?, ?)', [updated.senderId, updated.receiverId]);
    }

    res.json({ message: 'Pagamento do remetente confirmado com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao confirmar pagamento' });
  }
});

// Confirmar pagamento do destinatário
router.post('/transactions/:id/confirm-receiver-payment', async (req, res) => {
  try {
    const { notes } = req.body;

    const transaction = await db.get('SELECT * FROM transactions WHERE id = ?', [req.params.id]);

    if (!transaction) {
      return res.status(404).json({ error: 'Transação não encontrada' });
    }

    await db.run(`
      UPDATE transactions
      SET receiverPaymentConfirmed = 1,
          adminNotes = CASE WHEN adminNotes IS NULL OR adminNotes = '' THEN ? ELSE adminNotes || '\n' || ? END,
          updatedAt = CURRENT_TIMESTAMP
      WHERE id = ?
    `, [notes || '', notes || '', req.params.id]);

    // Verificar se ambos os pagamentos foram confirmados
    const updated = await db.get('SELECT * FROM transactions WHERE id = ?', [req.params.id]);
    if (updated.senderPaymentConfirmed && updated.receiverPaymentConfirmed) {
      await db.run('UPDATE transactions SET status = "completed", updatedAt = CURRENT_TIMESTAMP WHERE id = ?', [req.params.id]);

      // Atualizar contador de transações dos usuários
      await db.run('UPDATE users SET totalTransactions = totalTransactions + 1 WHERE id IN (?, ?)', [updated.senderId, updated.receiverId]);
    }

    res.json({ message: 'Pagamento do destinatário confirmado com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao confirmar pagamento' });
  }
});

// Rejeitar transação
router.post('/transactions/:id/reject', async (req, res) => {
  try {
    const { reason } = req.body;

    await db.run(`
      UPDATE transactions
      SET status = 'cancelled',
          adminNotes = ?,
          updatedAt = CURRENT_TIMESTAMP
      WHERE id = ?
    `, [reason || 'Rejeitado pelo administrador', req.params.id]);

    // Reativar proposta
    const transaction = await db.get('SELECT proposalId FROM transactions WHERE id = ?', [req.params.id]);
    await db.run('UPDATE proposals SET status = "active" WHERE id = ?', [transaction.proposalId]);

    res.json({ message: 'Transação rejeitada com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao rejeitar transação' });
  }
});

// Verificar usuário
router.post('/users/:id/verify', async (req, res) => {
  try {
    await db.run('UPDATE users SET verified = 1 WHERE id = ?', [req.params.id]);
    res.json({ message: 'Usuário verificado com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao verificar usuário' });
  }
});

// Banir/desbanir usuário
router.post('/users/:id/ban', async (req, res) => {
  try {
    const { banned } = req.body;
    // Aqui você pode adicionar uma coluna 'banned' na tabela users se quiser
    res.json({ message: banned ? 'Usuário banido' : 'Usuário desbanido' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao banir usuário' });
  }
});

module.exports = router;
