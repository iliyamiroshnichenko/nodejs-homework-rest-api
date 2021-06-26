const mongoose = require("mongoose");
const bCrypt = require("bcryptjs");
const { Schema, model } = mongoose;

const user = new Schema({
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  token: {
    type: String,
    default: null,
  },
});

// user.pre("save", async function () {
//   if (this.isNew) {
//     this.password = await bcrypt.hash(this.password, 9);
//   }
// });
user.methods.setPassword = function (password) {
  this.password = bCrypt.hashSync(password, bCrypt.genSaltSync(6));
};

user.methods.validPassword = function (password) {
  const a = bCrypt.compareSync(password, this.password);
  return a;
};

const Users = model("user", user);

module.exports = Users;
