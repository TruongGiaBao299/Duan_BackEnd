require("dotenv").config();
const PostOffice = require("../models/postoffice");

// Tạo bưu cục
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
      OfficeLongitude: OfficeLongitude,
      status: "not activated"
    });
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};


// Lấy dữ liệu bưu cục
const getPostOfficeService = async () => {
  try {
    let result = await PostOffice.find({});
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// đổi trạng thái bưu cục thành active
const updatePostOfficeStatusService = async (id) => {
  try {
    // Tìm và cập nhật driver theo ID
    const result = await PostOffice.findByIdAndUpdate(
      id,
      {
        status: "active",
      },
      { new: true } // Trả về document đã cập nhật
    );

    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// đổi trạng thái bưu cục thành not activated
const UnActivePostOfficeStatusService = async (id) => {
  try {
    // Tìm và cập nhật driver theo ID
    const result = await PostOffice.findByIdAndUpdate(
      id,
      {
        status: "not activated",
      },
      { new: true } // Trả về document đã cập nhật
    );

    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};


module.exports = {
    createPostOfficeService, getPostOfficeService, updatePostOfficeStatusService, UnActivePostOfficeStatusService
};
