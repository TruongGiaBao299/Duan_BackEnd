const express = require('express');
const { createUser, handleLogin, getUser, deleteUser, getAccount, becomeDriver, becomeGuest } = require('../controllers/userController');
const { createOrder, getOrder, deleteOrder, getOrderById, getOrderByEmail, updateOrderDriverStatus, getDiverOrderByEmail, updateOrderShippedStatus, updateOrderCancelledStatus } = require('../controllers/orderController');
const auth = require('../middleware/auth');
const { createPostOffice, getPostOffice, updatePostOfficeStatus, UnActivePostOfficeStatus } = require('../controllers/postOfficeController');
const { createDriver, updateDriverStatus, getDriver } = require('../controllers/driverController');

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

// become driver
routerAPI.post("/becomeGuest/:id", becomeGuest)
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

// Get user order
routerAPI.get("/getorderemail", getOrderByEmail)

// update driver for order
routerAPI.post("/updateorderdriver/:id", updateOrderDriverStatus)

// Get driver order
routerAPI.get("/getdriverorderemail", getDiverOrderByEmail)

// update shipped status
routerAPI.post("/updateordershipped/:id", updateOrderShippedStatus)

// update cancelled status
routerAPI.post("/updateordercancelled/:id", updateOrderCancelledStatus)
// -------------END-------------

// -------------PostOffice-------------
// Create post office
routerAPI.post("/postoffice", createPostOffice);

// Get post office
routerAPI.get("/getpostoffice", getPostOffice)

// update postoffice status
routerAPI.post("/postoffice/:id", updatePostOfficeStatus)
// -------------END-------------

// -------------Driver-------------
// Create post office
routerAPI.post("/driver", createDriver);

// update driver status
routerAPI.post("/driver/:id", updateDriverStatus)

// Get driver
routerAPI.get("/getdriver", getDriver)

// update driver status
routerAPI.post("/driverUnActive/:id", UnActivePostOfficeStatus)
// -------------END-------------


module.exports = routerAPI; //export default
