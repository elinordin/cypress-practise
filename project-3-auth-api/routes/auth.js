const router = require('express').Router()
const User = require('../models/users')

router.post('/register', async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    })

    try {
        const savedUser = await user.save()
        res.send('Your new user is now saved to the database, yey! ' + savedUser)
    } catch(err) {
        res.status(400).send("Error: " + err)
    }
})

module.exports = router