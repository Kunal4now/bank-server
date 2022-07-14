const mongoose = require('mongoose')
const {Schema} = mongoose

const transactionSchema = new Schema({
	sender: {
		type: String,
		required: true
	},
	receiver: {
		type: String,
		required: true
	},
	amount: {
		type: Number,
		required: true
	},
	type: {
		type: String,
		required: true,
		enum: ['credit', 'debit']
	}
})

const Transaction = mongoose.model('Transaction', transactionSchema)
module.exports = Transaction
