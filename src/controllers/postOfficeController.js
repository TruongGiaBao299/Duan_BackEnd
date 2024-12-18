const {
  createPostOfficeService,
  getPostOfficeService,
} = require("../services/postOfficeService");

// Tạo bưu cục
const createPostOffice = async (req, res) => {
  // tạo request body
  const {
    OfficeName,
    OfficeHotline,
    OfficeAddress,
    OfficeDistrict,
    OfficeCity,
    OfficeLatitude,
    OfficeLongitude
  } = req.body;
  // tạo đơn
  const data = await createPostOfficeService(
    OfficeName,
    OfficeHotline,
    OfficeAddress,
    OfficeDistrict,
    OfficeCity,
    OfficeLatitude,
    OfficeLongitude
  );
  return res.status(200).json(data);
};

// Lấy dữ liệu bưu cục
const getPostOffice = async (req, res) => {
  // tạo request body
  const data = await getPostOfficeService();
  return res.status(200).json(data);
};

module.exports = {
  createPostOffice,
  getPostOffice,
};
