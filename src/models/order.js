const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  // Sender
  senderName: String,
  senderNumber: String,
  fromAddress: String,
  fromDistrict: String,
  fromCity: String,

  // Recipient
  recipientName: String,
  recipientNumber: String,
  toAddress: String,
  toDistrict: String,
  toCity: String,

  // Order info
  orderWeight: Number,
  orderSize: Number,
  type: String,
  message: String,
  price: Number,
  status: String,
  createdBy: String,
  driver: String,
  // Creation date
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("order", userSchema);

module.exports = Order;
