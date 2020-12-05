const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/weCare", {
    useFindAndModify: false,
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database is connected..."));

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

const bookings_schema = new mongoose.Schema(
  {
    BookingId: {
      type: String,
    },
    UserId: {
      type: String,
    },
    CoachId: {
      type: String,
    },
    AppointmentDate: {
      type: Date,
    },
    Slot: {
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
const bookings = mongoose.model("bookings", bookings_schema);

module.exports = { users, coaches, bookings };
