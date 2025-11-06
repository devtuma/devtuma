const express = require('express');
const multer = require('multer');
const path = require('path');
const db = require('../database');
const { authMiddleware } = require('../middleware/auth');
const router = express.Router();

// Configurar upload de arquivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'proof-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|pdf/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('Apenas imagens (JPEG, PNG) ou PDF são permitidos'));
    }
  }
});

// Listar transações do usuário
router.get('/my-transactions', authMiddleware, async (req, res) => {
  try {
    const transactions = await db.query(`
      SELECT t.*,
        sender.name as senderName, sender.country as senderCountry,
        receiver.name as receiverName, receiver.country as receiverCountry
      FROM transactions t
      LEFT JOIN users sender ON t.senderId = sender.id
      LEFT JOIN users receiver ON t.receiverId = receiver.id
      WHERE t.senderId = ? OR t.receiverId = ?
      ORDER BY t.createdAt DESC
    `, [req.userId, req.userId]);

    res.json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar transações' });
  }
});

// Criar transação (conectar com proposta)
router.post('/connect/:proposalId', authMiddleware, async (req, res) => {
  try {
    const proposal = await db.get('SELECT * FROM proposals WHERE id = ? AND status = "active"', [req.params.proposalId]);

    if (!proposal) {
      return res.status(404).json({ error: 'Proposta não encontrada ou já conectada' });
    }

    if (proposal.userId === req.userId) {
      return res.status(400).json({ error: 'Você não pode conectar com sua própria proposta' });
    }

    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 12); // 12 horas para pagamento

    const result = await db.run(`
      INSERT INTO transactions (
        proposalId, senderId, receiverId,
        amount, fromCurrency, toCurrency,
        exchangeRate, fee, totalAmount, expiresAt
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      proposal.id,
      req.userId,
      proposal.userId,
      proposal.amount,
      proposal.fromCurrency,
      proposal.toCurrency,
      proposal.exchangeRate,
      proposal.fee,
      proposal.convertedAmount,
      expiresAt
    ]);

    // Atualizar status da proposta
    await db.run('UPDATE proposals SET status = "connected" WHERE id = ?', [proposal.id]);

    const transaction = await db.get('SELECT * FROM transactions WHERE id = ?', [result.id]);
    res.status(201).json(transaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar transação' });
  }
});

// Upload de comprovante
router.post('/:id/upload-proof', authMiddleware, upload.single('proof'), async (req, res) => {
  try {
    const { side } = req.body; // 'sender' ou 'receiver'
    const transaction = await db.get('SELECT * FROM transactions WHERE id = ?', [req.params.id]);

    if (!transaction) {
      return res.status(404).json({ error: 'Transação não encontrada' });
    }

    const isSender = transaction.senderId === req.userId;
    const isReceiver = transaction.receiverId === req.userId;

    if (!isSender && !isReceiver) {
      return res.status(403).json({ error: 'Você não participa desta transação' });
    }

    const field = isSender ? 'senderPaymentProof' : 'receiverPaymentProof';
    await db.run(`UPDATE transactions SET ${field} = ?, status = 'payment_sent', updatedAt = CURRENT_TIMESTAMP WHERE id = ?`, [req.file.filename, req.params.id]);

    res.json({ success: true, filename: req.file.filename });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao fazer upload' });
  }
});

// Cancelar transação
router.post('/:id/cancel', authMiddleware, async (req, res) => {
  try {
    const transaction = await db.get('SELECT * FROM transactions WHERE id = ?', [req.params.id]);

    if (!transaction) {
      return res.status(404).json({ error: 'Transação não encontrada' });
    }

    if (transaction.senderId !== req.userId && transaction.receiverId !== req.userId) {
      return res.status(403).json({ error: 'Você não participa desta transação' });
    }

    if (transaction.status === 'completed') {
      return res.status(400).json({ error: 'Transação já concluída não pode ser cancelada' });
    }

    await db.run('UPDATE transactions SET status = "cancelled", updatedAt = CURRENT_TIMESTAMP WHERE id = ?', [req.params.id]);
    await db.run('UPDATE proposals SET status = "active" WHERE id = ?', [transaction.proposalId]);

    res.json({ message: 'Transação cancelada com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao cancelar transação' });
  }
});

module.exports = router;
