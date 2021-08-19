const router = require('express').Router()
const User = require('../models/users')
const Joi = require('joi')

const validationSchema = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
})

router.post('/register', async (req, res) => {
    const {error} = validationSchema.validate(req.body)

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