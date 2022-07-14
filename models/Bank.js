const mongoose = require('mongoose')
const {Schema} = mongoose

const bankSchema = new Schema({
    balance: {
        type: Number,
        required: true,
        default: 0
    },
    totalAccounts: {
        type: Number,
        required: true,
        default: 0
    }
})

const Bank = mongoose.model('Bank', bankSchema)
module.exports = Bank
