const router = require('express').Router();
const isAdmin = require('../middlewares/isAdmin')
const fetchUser = require('../middlewares/fetchUser');
const transactionController = require('../controllers/transaction-controller');

router.get('/', fetchUser, transactionController.getTransactions);

router.post('/transfer', fetchUser, transactionController.transfer)

router.post('/credit', fetchUser, isAdmin, transactionController.credit)

router.post('/debit', fetchUser, isAdmin, transactionController.debit)

module.exports = router;