const express = require('express');
const db = require('../database');
const { authMiddleware } = require('../middleware/auth');
const router = express.Router();

// Listar propostas disponíveis (sem autenticação para preview)
router.get('/', async (req, res) => {
  try {
    const { currency } = req.query;
    let query = `
      SELECT p.*, u.name as userName, u.rating, u.totalTransactions, u.country as userCountry, u.verified
      FROM proposals p
      JOIN users u ON p.userId = u.id
      WHERE p.status = 'active'
    `;

    if (currency) {
      query += ` AND p.fromCurrency = '${currency}'`;
    }

    query += ' ORDER BY p.createdAt DESC LIMIT 20';

    const proposals = await db.query(query);
    res.json(proposals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar propostas' });
  }
});

// Listar propostas do usuário logado
router.get('/my-proposals', authMiddleware, async (req, res) => {
  try {
    const proposals = await db.query(
      'SELECT * FROM proposals WHERE userId = ? ORDER BY createdAt DESC',
      [req.userId]
    );
    res.json(proposals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar suas propostas' });
  }
});

// Criar proposta
router.post('/', authMiddleware, async (req, res) => {
  try {
    const {
      amount,
      fromCurrency,
      toCurrency,
      recipientName,
      recipientEmail,
      recipientPhone,
      recipientDocument,
      recipientCountry,
      exchangeRate,
      convertedAmount,
      fee
    } = req.body;

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // Expira em 7 dias

    const result = await db.run(`
      INSERT INTO proposals (
        userId, amount, fromCurrency, toCurrency,
        recipientName, recipientEmail, recipientPhone,
        recipientDocument, recipientCountry,
        exchangeRate, convertedAmount, fee, expiresAt
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      req.userId, amount, fromCurrency, toCurrency,
      recipientName, recipientEmail, recipientPhone,
      recipientDocument, recipientCountry,
      exchangeRate, convertedAmount, fee, expiresAt
    ]);

    const proposal = await db.get('SELECT * FROM proposals WHERE id = ?', [result.id]);
    res.status(201).json(proposal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar proposta' });
  }
});

// Deletar proposta
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const proposal = await db.get('SELECT * FROM proposals WHERE id = ? AND userId = ?', [req.params.id, req.userId]);

    if (!proposal) {
      return res.status(404).json({ error: 'Proposta não encontrada' });
    }

    if (proposal.status !== 'active') {
      return res.status(400).json({ error: 'Não é possível deletar proposta já conectada' });
    }

    await db.run('DELETE FROM proposals WHERE id = ?', [req.params.id]);
    res.json({ message: 'Proposta deletada com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao deletar proposta' });
  }
});

// Incrementar views
router.post('/:id/view', async (req, res) => {
  try {
    await db.run('UPDATE proposals SET views = views + 1 WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar views' });
  }
});

module.exports = router;
