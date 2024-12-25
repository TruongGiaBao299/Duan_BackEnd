const express = require('express');
const { createUser, handleLogin, getUser, deleteUser, getAccount, becomeDriver, becomeGuest } = require('../controllers/userController');
const { createOrder, getOrder, deleteOrder, getOrderById, getOrderByEmail, updateOrderDriverStatus, getDiverOrderByEmail, updateOrderShippedStatus, updateOrderCancelledStatus } = require('../controllers/orderController');
const auth = require('../middleware/auth');
const { createPostOffice, getPostOffice, updatePostOfficeStatus, UnActivePostOfficeStatus } = require('../controllers/postOfficeController');
const { createDriver, updateDriverStatus, getDriver, updateDriverToGuestStatus, deleteDriverRequest } = require('../controllers/driverController');
const { getDistrictAndWard, getAllDistrictAndWard } = require('../controllers/addressController');

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

// Become driver
routerAPI.post("/becomeDriver/:email", becomeDriver);

// Become guest
routerAPI.post("/becomeGuest/:email", becomeGuest);

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

// update driver status
routerAPI.post("/postofficeUnActive/:id", UnActivePostOfficeStatus)
// -------------END-------------

// -------------Driver-------------
// Create post office
routerAPI.post("/driver", createDriver);

// update driver status
routerAPI.post("/driver/:email", updateDriverStatus)

// Get driver
routerAPI.get("/getdriver", getDriver)

// update driver status unactive
routerAPI.post("/driverUnActive/:email", updateDriverToGuestStatus)

// Delete driver request
routerAPI.delete("/driverrequest/:email", deleteDriverRequest);
// -------------END-------------

// -------------Address-------------
// Get Address
routerAPI.get("/location/:cityCode", getDistrictAndWard)

// Get All Address
routerAPI.get("/location", getAllDistrictAndWard)
// -------------END-------------
module.exports = routerAPI; //export default
