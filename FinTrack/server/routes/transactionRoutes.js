const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const { authenticateToken } = require('../middleware/authMiddleware');

// All routes require authentication
router.use(authenticateToken);

// Transaction routes
router.get('/', transactionController.getAll);
router.post('/', transactionController.create);
router.get('/summary', transactionController.getSummary);
router.put('/:id', transactionController.update);
router.delete('/:id', transactionController.delete);

module.exports = router;
