const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, min: 3 },
    email: { type: String, required: true },
    password: { type: String, required: true, min: 4 },
  },
  { timestamps: true }
);

// Modify schema for response
userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    // the passwordHash should not be revealed
    delete returnedObject.password;
  },
});

module.exports = mongoose.model("User", userSchema);
