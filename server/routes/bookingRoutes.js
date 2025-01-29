const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");
const stripe = require("stripe")(
  "sk_test_51LFsZzSJDYv42pi4PgqgPXWjYryZsW5BDbwxUVvDyqC3060YVhqNTiYylfI1VtxdMGMRMkuTF5UBHPcHYXRz1Uyj00Gq04QKZV"
);
const Booking = require("../models/bookingModel");
//console.log(uuidv4());
router.post("/bookRoom", async (req, res) => {
  const {
    roomName,
    roomid,
    userid,
    userName,
    fromdate,
    todate,
    totalDays,
    totalAmount,
    token,
  } = req.body;

  try {
    /*   const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });
     const payment = await stripe.charges.create(
      {
        amount: totalAmount * 100,
        currency: "inr",
        customer: customer.id,
        receipt_email: token.email,
      },
      {
        idempotencyKey: uuidv4(),
      }
    ); */
    payment = true;
    if (payment) {
      const booking = new Booking({
        roomName,
        roomid,
        userid,
        userName,
        fromdate,
        todate,
        totalDays,
        totalAmount,
        transactionId: uuidv4().substring(0, 8),
      });
      await booking.save();
      //console.log("Payment", payment);
      res.send("Payment Successfull and Room Booked");
    }
  } catch (error) {
    console.log("Error", error);
    res.status(400).send("Payment Failed");
  }
});

router.get("/getBookingsById/:id", async (req, res) => {
  const userid = req.params.id;
  //console.log(userid);
  try {
    const bookings = await Booking.find({ userid }).sort({
      status: 1,
      createdAt: -1,
    });
    res.send(bookings);
  } catch (error) {
    res.status(400).send("No Bookings Found");
  }
});

router.post("/cancelbooking", async (req, res) => {
  const { bookingid } = req.body;

  try {
    const bookingitem = await Booking.findOne({ _id: bookingid });
    bookingitem.status = "cancelled";
    await bookingitem.save();

    res.send("Booking deleted successfully");
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "something went wrong" });
  }
});

router.get("/getallbookings", async (req, res) => {
  try {
    const bookings = await Booking.find({}).sort({ status: 1, createdAt: -1 });

    res.send(bookings);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.delete("/deleteBooking/:id", async (req, res) => {
  const bookingid = req.params.id;
  try {
    await Booking.findByIdAndDelete(bookingid);
    res.send("Booking deleted successfully");
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.put("/updateBookingStatus/:id", async (req, res) => {
  const bookingid = req.params.id;
  //console.log(bookingid);
  try {
    const booking = await Booking.findById(bookingid);
    if (booking) {
      booking.status = "cancelled";
      await booking.save();
      res.send("Booking status updated to cancelled");
    } else {
      res.status(404).send("Booking not found");
    }
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});
module.exports = router;

/* 

const methods = [
  "post /bookRoom",
  "get /getBookingsById/:id",
  "post /cancelbooking",
  "get /getallbookings",
  "delete /deleteBooking/:id",
  "put /updateBookingStatus/:id"
];

router.get("/methods", (req, res) => {
  res.send(methods);
});

*/
