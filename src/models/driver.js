const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    // Sender
    DriverName: String,
    DriverNumber: String,
    DriverEmail: String,
    DriverBirth: String,
    DriverId: String,
    DriverAddress: String,
    DriverCity: String,
    status: String,
    role: String,
});

const Driver = mongoose.model('driver', userSchema);

module.exports = Driver;
