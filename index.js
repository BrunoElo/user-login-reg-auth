const app = require("./app"); // The actual express application

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
