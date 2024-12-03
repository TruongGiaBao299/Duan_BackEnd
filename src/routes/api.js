const express = require('express');
const { createUser, handleLogin, getUser, deleteUser, getAccount } = require('../controllers/userController');
const auth = require('../middleware/auth');

const routerAPI = express.Router();

// set middleware for all routes
routerAPI.all("*", auth);

routerAPI.get("/", (req, res) =>{
    return res.status(200).json("Hello world")
})


// -------------Login/Register------------------
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
//--------------END------------------------

module.exports = routerAPI; //export default
