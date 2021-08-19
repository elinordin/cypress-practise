const router = require('express').Router()
const User = require('../models/users')
const {Validate} = require ('./validation')
const bcrypt = require ('bcrypt')
const jwt = require ('jsonwebtoken')

router.post('/register', async (req, res) => {
    
    const {error} = Validate.register(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    const emailExists = await User.findOne({email: req.body.email})
    if(emailExists) return res.status(400).send('User email already registered')

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 13)
    })

    try {
        const savedUser = await user.save()
        res.send(savedUser)
    } catch(err) {
        res.status(400).send(err)
    }
})

router.post('/login', async (req, res) => {
    
    const {error} = Validate.login(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    const existingUser = await User.findOne({email: req.body.email})
    if(!existingUser) return res.status(400).send('User not found')

    const validPassword = await bcrypt.compare(req.body.password, existingUser.password)
    if(!validPassword) return res.status(401).send('Invalid password')

    const token = jwt.sign({id: existingUser._id}, process.env.TOKEN_SECRET)
    res.header('auth-token', token).status(200).send(token)

})

router.delete('/delete', async (req, res) => {
    
    const userToDelete = await User.findOne({email: req.body.email})

    if (!userToDelete) return res.status(400).send('User not found')

    try {
        await userToDelete.deleteOne()
        res.send(userToDelete)
    } catch(err) {
        res.status(400).send(err)
    }
})

module.exports = router