const mongoose = require('mongoose')
const {Schema} = mongoose

const userSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	accountNo: {
		type: Number,
		required: true
	},
	balance: {
		type: Number,
		default: 0,
		require: true
	},
	password: {
		type: String,
		required: true
	},
	role: {
		type: String,
		default: 'user',
		enum: ['user', 'admin'],
		required: true
	}
})

const User = mongoose.model('User', userSchema)
module.exports = User
