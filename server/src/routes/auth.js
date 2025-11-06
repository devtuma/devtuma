const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../database');
const router = express.Router();

// Registro
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone, country, document } = req.body;

    // Verificar se usuário já existe
    const existingUser = await db.get('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser) {
      return res.status(400).json({ error: 'E-mail já cadastrado' });
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Inserir usuário
    const result = await db.run(
      'INSERT INTO users (name, email, password, phone, country, document) VALUES (?, ?, ?, ?, ?, ?)',
      [name, email, hashedPassword, phone, country, document]
    );

    // Gerar token
    const token = jwt.sign(
      { id: result.id, role: 'user' },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Buscar usuário criado
    const user = await db.get('SELECT id, name, email, phone, country, document, verified, rating, totalTransactions, createdAt FROM users WHERE id = ?', [result.id]);

    res.status(201).json({ user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar usuário
    const user = await db.get('SELECT * FROM users WHERE email = ?', [email]);
    if (!user) {
      return res.status(401).json({ error: 'E-mail ou senha incorretos' });
    }

    // Verificar senha
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'E-mail ou senha incorretos' });
    }

    // Gerar token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Remover senha do retorno
    delete user.password;

    res.json({ user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
});

// Verificar token
router.get('/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'Token não fornecido' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await db.get(
      'SELECT id, name, email, phone, country, document, role, verified, rating, totalTransactions, createdAt FROM users WHERE id = ?',
      [decoded.id]
    );

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.json({ user });
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' });
  }
});

module.exports = router;
