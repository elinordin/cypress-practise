const express = require('express')
const app = express()
const authRoute = require('./routes/auth')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

mongoose.connect(
    process.env.DB_CONNECT,
    {useNewUrlParser: true}, 
    () => {console.log('Successfully connected to database')})

app.use(express.json())
app.use('/api/user', authRoute)
app.listen(3000, () => {
    console.log('Server is up and running on port 3000')
})