const mongoose = require("mongoose");
bookingSchema = mongoose.Schema(
  {
    roomName: { type: String, required: true },
    roomid: { type: String, required: true },
    userid: { type: String, required: true },
    roomType: { type: String, required: true },
    userName: { type: String, required: true },
    fromdate: { type: String, required: true },
    todate: { type: String, required: true },
    additionalOccupancy: { type: Number, required: true },
    totalDays: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    transactionId: { type: String, required: true },
    status: { type: String, required: true, default: "booked" },
  },
  { timestamps: true }
);
Booking = mongoose.model("bookings", bookingSchema);
module.exports = Booking;
