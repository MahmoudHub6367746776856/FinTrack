const { getDb, saveDatabase } = require('../utils/db');

class TransactionModel {
  static create(userId, { type, amount, category, date, description }) {
    const db = getDb();
    
    db.run(
      `INSERT INTO transactions (user_id, type, amount, category, date, description) VALUES (?, ?, ?, ?, ?, ?)`,
      [userId, type, amount, category, date, description || null]
    );
    
    const result = db.exec('SELECT last_insert_rowid() as id');
    const id = result[0].values[0][0];
    
    saveDatabase();
    
    return this.findById(id, userId);
  }

  static findById(id, userId) {
    const db = getDb();
    const stmt = db.prepare('SELECT * FROM transactions WHERE id = ? AND user_id = ?');
    stmt.bind([id, userId]);
    
    if (stmt.step()) {
      const row = stmt.getAsObject();
      stmt.free();
      return row;
    }
    stmt.free();
    return null;
  }

  static findAllByUserId(userId, { page = 1, limit = 10 } = {}) {
    const db = getDb();
    const offset = (page - 1) * limit;
    
    // Get total count
    const countStmt = db.prepare('SELECT COUNT(*) as total FROM transactions WHERE user_id = ?');
    countStmt.bind([userId]);
    countStmt.step();
    const countRow = countStmt.getAsObject();
    const total = countRow.total;
    countStmt.free();
    
    // Get transactions with pagination
    const stmt = db.prepare(`
      SELECT * FROM transactions 
      WHERE user_id = ? 
      ORDER BY date DESC, created_at DESC 
      LIMIT ? OFFSET ?
    `);
    stmt.bind([userId, limit, offset]);
    
    const transactions = [];
    while (stmt.step()) {
      transactions.push(stmt.getAsObject());
    }
    stmt.free();
    
    return {
      transactions,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    };
  }

  static update(id, userId, { type, amount, category, date, description }) {
    const db = getDb();
    
    db.run(
      `UPDATE transactions SET type = ?, amount = ?, category = ?, date = ?, description = ? WHERE id = ? AND user_id = ?`,
      [type, amount, category, date, description || null, id, userId]
    );
    
    saveDatabase();
    return this.findById(id, userId);
  }

  static delete(id, userId) {
    const db = getDb();
    db.run('DELETE FROM transactions WHERE id = ? AND user_id = ?', [id, userId]);
    saveDatabase();
    return true;
  }

  static getSummaryByUserId(userId) {
    const db = getDb();
    
    const incomeStmt = db.prepare(`
      SELECT COALESCE(SUM(amount), 0) as total 
      FROM transactions 
      WHERE user_id = ? AND type = 'income'
    `);
    incomeStmt.bind([userId]);
    incomeStmt.step();
    const income = incomeStmt.getAsObject().total;
    incomeStmt.free();
    
    const expenseStmt = db.prepare(`
      SELECT COALESCE(SUM(amount), 0) as total 
      FROM transactions 
      WHERE user_id = ? AND type = 'expense'
    `);
    expenseStmt.bind([userId]);
    expenseStmt.step();
    const expenses = expenseStmt.getAsObject().total;
    expenseStmt.free();
    
    return {
      totalIncome: income,
      totalExpenses: expenses,
      balance: income - expenses
    };
  }

  static getMonthlySummary(userId, months = 6) {
    const db = getDb();
    const stmt = db.prepare(`
      SELECT 
        strftime('%Y-%m', date) as month,
        type,
        SUM(amount) as total
      FROM transactions
      WHERE user_id = ? 
        AND date >= date('now', '-' || ? || ' months')
      GROUP BY strftime('%Y-%m', date), type
      ORDER BY month ASC
    `);
    stmt.bind([userId, months]);
    
    const results = [];
    while (stmt.step()) {
      results.push(stmt.getAsObject());
    }
    stmt.free();
    
    return results;
  }

  static getCategoryBreakdown(userId) {
    const db = getDb();
    const stmt = db.prepare(`
      SELECT 
        category,
        SUM(amount) as total
      FROM transactions
      WHERE user_id = ? AND type = 'expense'
      GROUP BY category
      ORDER BY total DESC
    `);
    stmt.bind([userId]);
    
    const results = [];
    while (stmt.step()) {
      results.push(stmt.getAsObject());
    }
    stmt.free();
    
    return results;
  }

  static getCurrentMonthSummary(userId) {
    const db = getDb();
    
    const incomeStmt = db.prepare(`
      SELECT COALESCE(SUM(amount), 0) as total 
      FROM transactions 
      WHERE user_id = ? AND type = 'income'
        AND strftime('%Y-%m', date) = strftime('%Y-%m', 'now')
    `);
    incomeStmt.bind([userId]);
    incomeStmt.step();
    const income = incomeStmt.getAsObject().total;
    incomeStmt.free();
    
    const expenseStmt = db.prepare(`
      SELECT COALESCE(SUM(amount), 0) as total 
      FROM transactions 
      WHERE user_id = ? AND type = 'expense'
        AND strftime('%Y-%m', date) = strftime('%Y-%m', 'now')
    `);
    expenseStmt.bind([userId]);
    expenseStmt.step();
    const expenses = expenseStmt.getAsObject().total;
    expenseStmt.free();
    
    return {
      income,
      expenses,
      balance: income - expenses
    };
  }
}

module.exports = TransactionModel;
