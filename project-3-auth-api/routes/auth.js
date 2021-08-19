const router = require('express').Router()
const User = require('../models/users')
const {Validate} = require ('./validation')

router.post('/register', async (req, res) => {
    const {error} = Validate.register(req.body)

    if (error) return res.status(400).send(error.details[0].message)

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    })

    try {
        const savedUser = await user.save()
        res.send(savedUser)
    } catch(err) {
        res.status(400).send("Error: " + err)
    }
})

module.exports = router