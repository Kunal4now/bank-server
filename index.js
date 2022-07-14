require('dotenv').config();
const express = require('express')
const app = express()
const connectToMongo = require('./db')
const morgan = require('morgan')
const cors = require('cors')

const PORT = 5000 || process.env.PORT

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'))
}

app.use(express.json())	

app.use(cors(
	{
		origin: 'http://localhost:3000'
	}
))

app.use('/api/auth', require('./routes/auth'))
app.use('/api/users', require('./routes/user'))
app.use('/api/transactions', require('./routes/transaction'))
app.use('/api/bank', require('./routes/bank'))

app.listen(PORT, () => {
	console.log(`listening on port http://localhost:${PORT}`)
})

connectToMongo()
