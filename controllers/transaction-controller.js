const Transaction = require('../models/Transaction')
const Bank = require('../models/Bank');
const User = require('../models/User');

exports.getTransactions = async (req, res) => {
    try {
        const accountNo = req.user.accountNo;
        let transactions = await Transaction.find({accountNo: accountNo});

        if (!transactions) {
            res.status(400).json('No transactions found')
        }

        let userTransactions = transactions.filter((transaction) => {
            return (transaction.sender === String(accountNo) || transaction.receiver === String(accountNo))
        })

        res.status(200).json(userTransactions);
    } catch(err) {
        res.status(500).json(err);
    }
}

exports.transfer = async (req, res) => {
    try {
        const [receiver, amount] = [req.body.receiver, req.body.amount];
        const sender = req.user.accountNo;

        const senderAccount = await User.findOne({accountNo: sender});
        const receiverAccount = await User.findOne({accountNo: receiver});

        if (!senderAccount || !receiverAccount) {
            res.status(400).json('Account not found')
        }

        if (receiverAccount.role !== 'user') {
            return res.status(400).json({messg: 'Receiver is not a user', success: false});
        }

        if (sender === receiver) {
            return res.status(400).json({messg: 'You cannot transfer to your own account', success: false})
        }

        if (amount <= 0) {
            return res.status(400).json({messg: 'Invalid Amount', success: false})
        }

        if (senderAccount.balance < amount) {
            return res.status(400).json({messg: 'Insufficient balance', success: false});
        }

        const transaction = new Transaction({
            sender: sender,
            receiver: receiver,
            amount: amount,
            type: 'debit'
        })

        await transaction.save();

        await User.findByIdAndUpdate(senderAccount._id, {
            $inc: {balance: -amount}
        });
        await User.findByIdAndUpdate(receiverAccount._id, {
            $inc: {balance: amount}
        });

        return res.status(200).json({messg: 'Transaction successful', success: true});
    } catch(err) {
        return res.status(500).json({messg: err, success: false});
    }
}

exports.credit = async (req, res) => {
    try {
        const {accountNo, amount} = req.body;

        const user = await User.findOne({accountNo: accountNo});

        if (user.role !== 'user') {
            return res.status(400).json({messg: 'Cannot credit to this account', success: false});
        }

        if (!user) {
            res.status(400).json({messg: 'User not found', success: false})
        }

        if (amount <= 0) {
            return res.status(400).json({messg: 'Invalid Amount', success: false})
        }

        const transaction = new Transaction({
            sender: accountNo,
            receiver: accountNo,
            amount: amount,
            type: 'credit'
        })

        await transaction.save()

        await User.findByIdAndUpdate(user._id, {
            $inc: {balance: amount}
        });

        await Bank.updateOne({}, {
            $inc: {
                balance: amount
            }
        })

        res.status(200).json({messg: 'Credit successful', success: true});
    } catch(err) {
        res.status(500).json(err);
    }
}

exports.debit = async (req, res) => {
    try {
        const {accountNo, amount} = req.body;

        const user = await User.findOne({accountNo: accountNo});

        if (user.role !== 'user') {
            return res.status(400).json({messg: 'Cannot debit from this account', success: false});
        }

        if (!user) {
            res.status(400).json({messg: 'User not found', success: false})
        }

        if (amount <= 0) {
            return res.status(400).json({messg: 'Invalid Amount', success: false})
        }

        if (user.balance - amount < 0 || amount <= 0) {
            return res.status(400).json({messg: 'Insufficient balance', success: false});
        }

        const transaction = new Transaction({
            sender: accountNo,
            receiver: accountNo,
            amount: amount,
            type: 'debit'
        })

        await User.findByIdAndUpdate(user._id, {
            $inc: {balance: -amount}
        });
        
        await transaction.save()

        await Bank.updateOne({}, {
            $inc: {
                balance: -amount
            }
        })

        res.status(200).json({messg: 'Debit successful', success: true});
    } catch(err) {
        res.status(500).json(err);
    }
}