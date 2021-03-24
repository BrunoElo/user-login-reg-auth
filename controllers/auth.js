const usersRouter = require("express").Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
//const { registerValidation, loginValidation } = require("../utils/validation");
const middleware = require("../utils/middleware");

usersRouter.post(
  "/register",
  middleware.registerValidation,
  async (request, response) => {
    // Validation
    // const { error } = registerValidation(request.body);
    // if (error) return response.status(400).send(error.details[0].message);

    // Check if user exists
    const emailExist = await User.findOne({ email: request.body.email });
    if (emailExist) return response.status(400).send("Email already exists");

    // Check if name is taken
    const nameTaken = await User.findOne({ name: request.body.name });
    if (nameTaken) return response.status(400).send("Name already taken");

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(request.body.password, salt);

    // Create new user
    const user = new User({
      name: request.body.name,
      email: request.body.email,
      password: passwordHash,
    });
    try {
      const savedUser = await user.save();
      response.send(savedUser);
    } catch (error) {
      response.status(400).send(error);
    }
  }
);

usersRouter.post(
  "/login",
  middleware.loginValidation,
  async (request, response) => {
    // Validation
    // const { error } = loginValidation(request.body);
    //if (error)  return response.status(400).send(error.details[0].message);

    // Check if user is registered
    const user = await User.findOne({ name: request.body.name });
    if (!user) return response.status(400).send("Name is incorrect");
    /* //Using email
  const user = await User.findOne({ email: request.body.email });
  if (!user) return response.status(400).send("Email is incorrect");
 */
    // Check password
    const passwordCorrect = await bcrypt.compare(
      request.body.password,
      user.password
    );
    if (!passwordCorrect)
      return response.status(400).send("Password is incorrect");

    // create token
    const userForToken = {
      name: user.name,
      id: user._id,
    };
    const token = jwt.sign(userForToken, process.env.SECRET);

    response.header("Authorization", `Bearer ${token}`).send(token);
  }
);

module.exports = usersRouter;
