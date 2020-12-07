const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/weCare", {
  useFindAndModify: false,
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const coaches_schema = new mongoose.Schema(
  {
    CoachId: {
      type: String,
    },
    Name: {
      type: String,
      unique: true,
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
    MobileNumber: {
      type: Number,
    },
    Speciality: {
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
const coaches = mongoose.model("coaches", coaches_schema);

module.exports = coaches;
