const TransactionModel = require('../models/transactionModel');

const transactionController = {
  async create(req, res) {
    try {
      const { type, amount, category, date, description } = req.body;
      const userId = req.user.id;

      // Validation
      if (!type || !amount || !category || !date) {
        return res.status(400).json({ message: 'Type, amount, category, and date are required' });
      }

      if (!['income', 'expense'].includes(type)) {
        return res.status(400).json({ message: 'Type must be income or expense' });
      }

      if (amount <= 0) {
        return res.status(400).json({ message: 'Amount must be positive' });
      }

      const transaction = TransactionModel.create(userId, {
        type,
        amount: parseFloat(amount),
        category,
        date,
        description
      });

      res.status(201).json({
        message: 'Transaction created successfully',
        transaction
      });
    } catch (error) {
      console.error('Create transaction error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  async getAll(req, res) {
    try {
      const userId = req.user.id;
      const { page = 1, limit = 10 } = req.query;

      const result = TransactionModel.findAllByUserId(userId, {
        page: parseInt(page),
        limit: parseInt(limit)
      });

      res.json(result);
    } catch (error) {
      console.error('Get transactions error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      const { type, amount, category, date, description } = req.body;

      // Check if transaction exists
      const existingTransaction = TransactionModel.findById(id, userId);
      if (!existingTransaction) {
        return res.status(404).json({ message: 'Transaction not found' });
      }

      // Validation
      if (!['income', 'expense'].includes(type)) {
        return res.status(400).json({ message: 'Type must be income or expense' });
      }

      if (amount <= 0) {
        return res.status(400).json({ message: 'Amount must be positive' });
      }

      const transaction = TransactionModel.update(id, userId, {
        type,
        amount: parseFloat(amount),
        category,
        date,
        description
      });

      res.json({
        message: 'Transaction updated successfully',
        transaction
      });
    } catch (error) {
      console.error('Update transaction error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      const deleted = TransactionModel.delete(id, userId);
      if (!deleted) {
        return res.status(404).json({ message: 'Transaction not found' });
      }

      res.json({ message: 'Transaction deleted successfully' });
    } catch (error) {
      console.error('Delete transaction error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  async getSummary(req, res) {
    try {
      const userId = req.user.id;

      const summary = TransactionModel.getSummaryByUserId(userId);
      const monthlySummary = TransactionModel.getMonthlySummary(userId, 6);
      const categoryBreakdown = TransactionModel.getCategoryBreakdown(userId);
      const currentMonth = TransactionModel.getCurrentMonthSummary(userId);

      res.json({
        summary,
        monthlySummary,
        categoryBreakdown,
        currentMonth
      });
    } catch (error) {
      console.error('Get summary error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
};

module.exports = transactionController;
