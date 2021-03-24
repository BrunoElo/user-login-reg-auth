const homeRouter = require("express").Router();
const { userExtractor, tokenExtractor } = require("../utils/middleware");

homeRouter.get("/", async (request, response) => {
  response.send("<h1>Welcome to home</h1>");
});

/* Using middlewares to protect routes
homeRouter.get(
  "/",
  tokenExtractor,
  userExtractor,
  async (request, response, next) => {
    response.send(request.user);
    next();
  }
); */

module.exports = homeRouter;
