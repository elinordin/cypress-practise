const express = require('express')
const app = express()
const authRoute = require('./routes/auth')

app.use('/api/user', authRoute)

app.listen(3000, () => {
    console.log('Server is up and running on port 3000')
})