const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcryptjs');

const DB_PATH = path.join(__dirname, '..', 'transkwanza.db');

class Database {
  constructor() {
    this.db = new sqlite3.Database(DB_PATH, (err) => {
      if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
      } else {
        console.log('✅ Conectado ao banco de dados SQLite');
        this.init();
      }
    });
  }

  init() {
    this.db.serialize(() => {
      // Tabela de usuários
      this.db.run(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          email TEXT UNIQUE NOT NULL,
          password TEXT NOT NULL,
          phone TEXT NOT NULL,
          country TEXT NOT NULL,
          document TEXT NOT NULL,
          role TEXT DEFAULT 'user',
          verified BOOLEAN DEFAULT 0,
          rating REAL DEFAULT 0,
          totalTransactions INTEGER DEFAULT 0,
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Tabela de propostas
      this.db.run(`
        CREATE TABLE IF NOT EXISTS proposals (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          userId INTEGER NOT NULL,
          amount REAL NOT NULL,
          fromCurrency TEXT NOT NULL,
          toCurrency TEXT NOT NULL,
          recipientName TEXT NOT NULL,
          recipientEmail TEXT NOT NULL,
          recipientPhone TEXT NOT NULL,
          recipientDocument TEXT NOT NULL,
          recipientCountry TEXT NOT NULL,
          status TEXT DEFAULT 'active',
          views INTEGER DEFAULT 0,
          exchangeRate REAL NOT NULL,
          convertedAmount REAL NOT NULL,
          fee REAL NOT NULL,
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          expiresAt DATETIME,
          FOREIGN KEY (userId) REFERENCES users(id)
        )
      `);

      // Tabela de transações
      this.db.run(`
        CREATE TABLE IF NOT EXISTS transactions (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          proposalId INTEGER NOT NULL,
          senderId INTEGER NOT NULL,
          receiverId INTEGER,
          amount REAL NOT NULL,
          fromCurrency TEXT NOT NULL,
          toCurrency TEXT NOT NULL,
          exchangeRate REAL NOT NULL,
          fee REAL NOT NULL,
          totalAmount REAL NOT NULL,
          status TEXT DEFAULT 'pending',
          senderPaymentProof TEXT,
          receiverPaymentProof TEXT,
          senderPaymentConfirmed BOOLEAN DEFAULT 0,
          receiverPaymentConfirmed BOOLEAN DEFAULT 0,
          adminNotes TEXT,
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          expiresAt DATETIME,
          FOREIGN KEY (proposalId) REFERENCES proposals(id),
          FOREIGN KEY (senderId) REFERENCES users(id),
          FOREIGN KEY (receiverId) REFERENCES users(id)
        )
      `);

      // Tabela de notificações
      this.db.run(`
        CREATE TABLE IF NOT EXISTS notifications (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          userId INTEGER NOT NULL,
          type TEXT NOT NULL,
          title TEXT NOT NULL,
          message TEXT NOT NULL,
          read BOOLEAN DEFAULT 0,
          link TEXT,
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (userId) REFERENCES users(id)
        )
      `);

      // Criar usuário admin padrão
      this.createDefaultAdmin();
    });
  }

  async createDefaultAdmin() {
    const hashedPassword = await bcrypt.hash('admin123', 10);

    this.db.run(`
      INSERT OR IGNORE INTO users (name, email, password, phone, country, document, role, verified)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, ['Administrador', 'admin@transkwanza.com', hashedPassword, '+55 11 0000-0000', 'BR', '000.000.000-00', 'admin', 1],
    (err) => {
      if (!err) {
        console.log('✅ Usuário administrador criado: admin@transkwanza.com / admin123');
      }
    });
  }

  query(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }

  run(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function(err) {
        if (err) reject(err);
        else resolve({ id: this.lastID, changes: this.changes });
      });
    });
  }

  get(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }
}

module.exports = new Database();
