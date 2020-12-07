const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/weCare", {
  useFindAndModify: false,
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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

module.exports = bookings;
