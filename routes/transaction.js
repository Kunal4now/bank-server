const router = require('express').Router();
const isAdmin = require('../middlewares/isAdmin')
const fetchUser = require('../middlewares/fetchUser');
const transactionController = require('../controllers/transaction-controller');
const {body, validationResult} = require('express-validator');

router.get('/', fetchUser, transactionController.getTransactions);

router.post('/transfer', [
    body('receiver').isNumeric().isLength({min: 16, max: 16}).withMessage('Receiver must be provided'),
    body('amount').isNumeric().withMessage('Invalid Amount'),
], fetchUser, transactionController.transfer)

router.post('/credit', [
    body('amount').isNumeric({min: 1}).withMessage('Invalid Amount'),
    body('type').isIn(['credit', 'debit']).withMessage('Type must be provided'),
    body('accountNo').isNumeric().isLength({min: 16, max: 16}).withMessage('Invalid Account No.')
], fetchUser, isAdmin, transactionController.credit)

router.post('/debit', fetchUser, [
    body('amount').isNumeric({min: 1}).withMessage('Invalid Amount'),
    body('type').isIn(['credit', 'debit']).withMessage('Type must be provided'),
    body('accountNo').isNumeric().isLength({min: 16, max: 16}).withMessage('Invalid Account No.')
] , isAdmin, transactionController.debit)

module.exports = router;