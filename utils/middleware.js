const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Joi = require("@hapi/joi");

const registerValidation = (request, response, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().required().email(),
    password: Joi.string().min(4).required(),
  });
  const { error } = schema.validate(request.body);
  next(error);
};

const loginValidation = (request, response, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    password: Joi.string().min(4).required(),
  });
  const { error } = schema.validate(request.body);
  next(error);
};

const errorHandler = (error, request, response, next) => {
  if (error.name === "ValidationError") {
    return response.status(400).json(error);
  }
  next(error);
};

// Extracts token and adds it to request object
const tokenExtractor = (request, response, next) => {
  const authorization = request.header("Authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    request.token = authorization.substring(7);
  }
  next();
};

// Verifies token,finds user and adds it to request object
const userExtractor = async (request, response, next) => {
  decodedToken = jwt.verify(request.token, process.env.SECRET);
  request.user = await User.findById(decodedToken.id);
  next();
};

module.exports = {
  registerValidation,
  loginValidation,
  errorHandler,
  tokenExtractor,
  userExtractor,
};
