const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createPostOffice, getPostOffice, updatePostOfficeStatus, UnActivePostOfficeStatus } = require('../controllers/postOfficeController');

// set middleware for all routes
router.all("*", auth);

// Create post office
router.post("/create", createPostOffice);

// Get post office
router.get("/get", getPostOffice)

// update postoffice status
router.post("/status/:id", updatePostOfficeStatus)

// update driver status
router.post("/statusnotactive/:id", UnActivePostOfficeStatus)

module.exports = router;
