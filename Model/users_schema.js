const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/weCare", {
  useFindAndModify: false,
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const users_schema = new mongoose.Schema(
  {
    UserId: {
      type: String,
      unique: true,
    },
    Name: {
      type: String,
    },
    Password: {
      type: String,
    },
    Gender: {
      type: String,
    },
    DateOfBirth: {
      type: Date,
    },
    Email: {
      type: String,
      unique: true,
    },
    MobileNumber: {
      type: Number,
    },
    Pincode: {
      type: Number,
    },
    City: {
      type: String,
    },
    State: {
      type: String,
    },
    Country: {
      type: String,
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);
const users = mongoose.model("users", users_schema);
module.exports = users;
