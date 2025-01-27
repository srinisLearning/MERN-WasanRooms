const express = require("express");
const router = express.Router();
const Room = require("../models/roomModel");
const mongoose = require("mongoose");

router.get("/getAllRooms", async (req, res) => {
  try {
    const rooms = await Room.find({});
    //res.json(rooms);
    res.send(rooms);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

router.get("/getRoomById/:id", async (req, res) => {
  const roomId = req.params.id;

  if (mongoose.Types.ObjectId.isValid(roomId)) {
    const room = await Room.findById(roomId);
    if (room) {
      res.json(room);
      //console.log(room);
    } else {
      res.status(404).json({ error: "Room not found" });
    }
  } else {
    res.status(400).json({ error: "Invalid room ID" });
  }
});

router.post("/addRoom", async (req, res) => {
  const {
    name,
    city,
    imageUrl,
    phoneNumber,
    contactPerson,
    email,
    website,
    rentPerDay,
    description,
    singleStandardFactor,
    doubleStandardFactor,
    doublePremiumFactor,
    suiteFactor,
    additionalOccupancyFactor,
    checkOutTime,
  } = req.body;

  try {
    const room = new Room({
      name,
      city,
      imageUrl,
      email,
      phoneNumber,
      contactPerson,
      website,
      rentPerDay,
      description,
      singleStandardFactor,
      doubleStandardFactor,
      doublePremiumFactor,
      suiteFactor,
      additionalOccupancyFactor,
      checkOutTime,
    });

    const createdRoom = await room.save();
    res.status(201).json(createdRoom);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});
router.delete("/deleteRoom/:id", async (req, res) => {
  const roomId = req.params.id;

  if (mongoose.Types.ObjectId.isValid(roomId)) {
    const room = await Room.findById(roomId);
    if (room) {
      await room.deleteOne();
      res.json({ message: "Room removed" });
    } else {
      res.status(404).json({ error: "Room not found" });
    }
  } else {
    res.status(400).json({ error: "Invalid room ID" });
  }
});
router.put("/updateRoom/:id", async (req, res) => {
  const roomId = req.params.id;
  if (mongoose.Types.ObjectId.isValid(roomId)) {
    const room = await Room.findById(roomId);
    if (room) {
      const {
        name,
        city,
        imageUrl,
        phoneNumber,
        contactPerson,
        email,
        website,
        rentPerDay,
        description,
        singleStandardFactor,
        doubleStandardFactor,
        doublePremiumFactor,
        suiteFactor,
        additionalOccupancyFactor,
        checkOutTime,
      } = req.body;

      room.name = name;
      room.city = city;
      room.imageUrl = imageUrl;
      room.phoneNumber = phoneNumber;
      room.contactPerson = contactPerson;
      room.email = email;
      room.website = website;
      room.rentPerDay = rentPerDay;
      room.description = description;
      room.singleStandardFactor = singleStandardFactor;
      room.doubleStandardFactor = doubleStandardFactor;
      room.doublePremiumFactor = doublePremiumFactor;
      room.suiteFactor = suiteFactor;
      room.additionalOccupancyFactor = additionalOccupancyFactor;
      room.checkOutTime = checkOutTime;

      const updatedRoom = await room.save();
      res.json({ message: "Room Updated", updatedRoom });
    } else {
      res.status(404).json({ error: "Room not found" });
    }
  } else {
    res.status(400).json({ error: "Invalid room ID" });
  }
});

module.exports = router;

/* 
router.get("/", (req, res) => {
  res.json({
    routes: [
      { method: "GET", path: "/getAllRooms" },
      { method: "GET", path: "/getRoomById/:id" },
      { method: "POST", path: "/addRoom" },
      { method: "DELETE", path: "/deleteRoom/:id" },
      { method: "PUT", path: "/updateRoom/:id" },
    ],
  });
});

*/
