const express = require('express');
const { createUser, handleLogin, getUser, deleteUser, getAccount, becomeDriver } = require('../controllers/userController');
const { createOrder, getOrder, deleteOrder, getOrderById, updateOrderStatus } = require('../controllers/orderController');
const auth = require('../middleware/auth');

const routerAPI = express.Router();

// set middleware for all routes
routerAPI.all("*", auth);

routerAPI.get("/", (req, res) =>{
    return res.status(200).json("Hello world")
})


// -------------Login/Register-------------
// Create user
routerAPI.post("/register", createUser);

// Check login
routerAPI.post("/login", handleLogin);

// Get user
routerAPI.get("/user", getUser)

// Delete user
routerAPI.delete("/user/:id", deleteUser);

// Get account
routerAPI.get("/account", getAccount)

// become driver
routerAPI.post("/becomeDriver/:id",becomeDriver)
//-------------END-------------

// -------------Order-------------
// Create order
routerAPI.post("/order", createOrder);

// Get order
routerAPI.get("/getorder", getOrder)

// Delete order
routerAPI.delete("/order/:id", deleteOrder);

// Get order
routerAPI.get("/getorder/:id", getOrderById)

// update order status
routerAPI.post("/getorder/:id/status", updateOrderStatus)
// -------------END-------------

module.exports = routerAPI; //export default
