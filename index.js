require('dotenv').config();
const express = require('express')
const app = express()
const connectToMongo = require('./db')
const morgan = require('morgan')
const cors = require('cors')

const PORT = process.env.PORT || 5000

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'))
}

app.use(express.json())	

app.use(cors(
	{
		origin: "*"
	}
))

app.use('/api/auth', require('./routes/auth'))
app.use('/api/users', require('./routes/user'))
app.use('/api/transactions', require('./routes/transaction'))
app.use('/api/bank', require('./routes/bank'))

app.get('*', (req, res) => {
	return res.status(404).json({
		messg: 'Not found',
		success: false
	})
})

app.listen(PORT, () => {
	console.log(`listening on port http://localhost:${PORT}`)
})

connectToMongo()
