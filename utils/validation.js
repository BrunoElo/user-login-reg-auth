const Joi = require("@hapi/joi");

const registerValidation = (requestBody) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().required().email(),
    password: Joi.string().min(4).required(),
  });
  return schema.validate(requestBody);
};

const loginValidation = (requestBody) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    password: Joi.string().min(4).required(),
  });
  return schema.validate(requestBody);
};

module.exports = {
  registerValidation,
  loginValidation,
};
