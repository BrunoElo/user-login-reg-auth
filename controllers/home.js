const homeRouter = require("express").Router();
const { userExtractor, tokenExtractor } = require("../utils/middleware");

homeRouter.get(
  "/",
  tokenExtractor,
  userExtractor,
  async (request, response, next) => {
    response.send(request.user);
    next();
  }
);

module.exports = homeRouter;
