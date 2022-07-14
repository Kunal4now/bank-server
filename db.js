const mongoose = require('mongoose')
const mongoURI = process.env.URI

const connectToMongo = async () => {
	await mongoose.connect(mongoURI, () => {
		console.log('Connected to mongo sucessfully!')
	})
}

module.exports = connectToMongo
