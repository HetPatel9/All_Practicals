const mongoose = require("mongoose");
const validator = require("validator");
const { default: isEmail } = require("validator/lib/isEmail");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (val) {
        return isEmail(val);
      }
    }
  },
  password: {
    type: String,
    required: true,
    length: [8, "password must have maximum length of 8 character"]
  },
  passwordConfirm: {
    type: String,
    required: true,
    validate: {
      validator: function (val) {
        return val == this.password;
      }
    }
  },
  age: {
    type: Number,
    required: true,
    max: [80, "age must be less then 80"],
    min: [18, "age must be more then 18"]
  },
  phone: {
    type: Number,
    length: 10
  }
});

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.checkPassword = async function (
  requestedPassword,
  userPassword
) {
  return await bcrypt.compare(requestedPassword, userPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
