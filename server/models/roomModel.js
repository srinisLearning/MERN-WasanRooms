const mongoose = require("mongoose");
const roomSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    city: { type: String, required: true },
    imageUrl: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    website: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    contactPerson: { type: String, required: true },
    rentPerDay: { type: Number, required: true },
    singleStandardFactor: { type: Number, required: true },
    doubleStandardFactor: { type: Number, required: true },
    doublePremiumFactor: { type: Number, required: true },
    suiteFactor: { type: Number, required: true },
    additionalOccupancyFactor: { type: Number, required: true },
    checkOutTime: { type: String, required: true },
  },
  { timestamps: true }
);

const Room = mongoose.model("rooms", roomSchema);

module.exports = Room;
