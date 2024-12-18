const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    // Sender
    OfficeName: String,
    OfficeHotline: String,
    OfficeAddress: String,
    OfficeDistrict: String,
    OfficeCity: String,
    OfficeLocation: String,
    OfficeLatitude: String,
    OfficeLongitude: String,
});

const PostOffice = mongoose.model('postoffice', userSchema);

module.exports = PostOffice;
