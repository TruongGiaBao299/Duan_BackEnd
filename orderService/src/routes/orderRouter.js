const express = require('express');
const { createOrder, getOrder, deleteOrder, getOrderById, getOrderByEmail, updateOrderDriverStatus, updateOrderShippedStatus, updateOrderCancelledStatus, getDriverOrderByEmail, searchOrder } = require('../controllers/orderController');
const router = express.Router();
const auth = require('../middleware/auth');

// set middleware for all routes
router.all("*", auth);

// Post man Order
// Create order
router.post("/create", createOrder);

// Get order
router.get("/getorder", getOrder)

// Delete order
router.delete("/delete/:id", deleteOrder);

// Get order
router.get("/getorder/:id", getOrderById)

// Get user order
router.get("/getorderemail", getOrderByEmail)

// Post man Driver
// Get driver order
router.get("/getdriverorderbyemail", getDriverOrderByEmail)

// update driver for order
router.post("/isshippingorder/:id", updateOrderDriverStatus)

// update shipped status
router.post("/shippedorder/:id", updateOrderShippedStatus)

// update cancelled status
router.post("/canceledorder/:id", updateOrderCancelledStatus)

// search order price
router.post("/checkprice", searchOrder)

module.exports = router;
