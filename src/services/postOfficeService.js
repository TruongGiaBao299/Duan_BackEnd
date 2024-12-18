require("dotenv").config();
const PostOffice = require("../models/postoffice");

// Tạo đơn hàng
const createPostOfficeService = async (
    OfficeName,
    OfficeHotline,
    OfficeAddress,
    OfficeDistrict,
    OfficeCity,
    OfficeLatitude,
    OfficeLongitude
) => {
  try {
    let result = await PostOffice.create({
      OfficeName: OfficeName,
      OfficeHotline: OfficeHotline,
      OfficeAddress: OfficeAddress,
      OfficeDistrict: OfficeDistrict,
      OfficeCity: OfficeCity,
      OfficeLatitude: OfficeLatitude,
      OfficeLongitude: OfficeLongitude
    });
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};


// Lấy dữ liệu đơn hàng
const getPostOfficeService = async () => {
  try {
    let result = await PostOffice.find({});
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};


module.exports = {
    createPostOfficeService, getPostOfficeService
};
