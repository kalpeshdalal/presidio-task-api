const Joi = require('joi');
const { password, emailCustom, phone } = require('./custom.validation');



const signup = {
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      "string.empty": `Email must contain value`,
      "any.required": `Email is a required field`,
      "string.email": `Email must be valid mail`,
    }),
    password: Joi.string().required().custom(password).messages({
      "string.empty": `Password must contain value`,
      "any.required": `Password is a required field`
    }),
    firstName: Joi.string().trim().required().messages({
      "string.empty": `First name must contain value`,
      "any.required": `First name is a required field`
    }),
    lastName: Joi.string().trim().required().messages({
      "string.empty": `Last name must contain value`,
      "any.required": `Last name is a required field`
    }),
    phone: Joi.string().required().custom(phone).messages({
      "string.empty": `Phone number must contain value`,
      "any.required": `Phone number is a required field`
    }),
    role: Joi.string().required().valid('buyer', 'seller').messages({
      "any.required": `Role is a required field`,
      "any.only": `Role must be either 'buyer' or 'seller'`
    })
  }),
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().required().custom(emailCustom).messages({
      "string.empty": `Email must contain value`,
      "any.required": `Email is a required field`
    }),
    password: Joi.string().required().messages({
      "string.empty": `Password must contain value`
    }),
  }),
};


const logout = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

module.exports = {
  login,
  logout,
  signup,
};
