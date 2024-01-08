const Joi = require("joi");

const validator = (schema) => (payload) => 
    schema.validate(payload, { abortEarly: false });

const listSchema = Joi.object({
    name: Joi.string().min(3).max(12).required()
})

const userLoginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(12).required(),
    confirmPassword: Joi.ref("password"),
    address: {
        state: Joi.string().length(2).required(),
    },
    dob: Joi.date().less(new Date("2015-12-31")).required()
});

const valideLogin = Joi.object({
    username: Joi.string().required(),
    // password: Joi.string().required()
});

exports.valideSchema = validator(listSchema);
exports.valideUserLogin = validator(userLoginSchema);
exports.valideLogin = validator(valideLogin);