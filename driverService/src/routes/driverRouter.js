const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createDriver, updateDriverStatus, getDriver, updateDriverToGuestStatus, deleteDriverRequest } = require('../controllers/driverController');

// set middleware for all routes
router.all("*", auth);

// Create post office
router.post("/create", createDriver);

// Get driver
router.get("/get", getDriver)

// update driver status
router.post("/active/:email", updateDriverStatus)

// update driver status unactive
router.post("/noactive/:email", updateDriverToGuestStatus)

// Delete driver request
router.delete("/noaccept/:email", deleteDriverRequest);

module.exports = router;
