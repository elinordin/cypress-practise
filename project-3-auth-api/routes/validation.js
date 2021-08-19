const Joi = require('joi')

class Validate {
    
    static register (request) {
        const validationSchema = Joi.object({
            name: Joi.string().min(2).required(),
            email: Joi.string().min(6).required().email(),
            password: Joi.string().min(6).required()
        })

        return validationSchema.validate(request)
    }

    static login (request) {
        const validationSchema = Joi.object({
            email: Joi.string().min(6).required().email(),
            password: Joi.string().min(6).required()
        })

        return validationSchema.validate(request)
    }
}

module.exports = {Validate}

