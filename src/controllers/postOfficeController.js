const { updateDriverStatusService } = require("../services/driverService");
const {
  createPostOfficeService,
  getPostOfficeService,
  updatePostOfficeStatusService,
  UnActivePostOfficeStatusService,
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

const updatePostOfficeStatus = async (req, res) => {
  const { id } = req.params; // Lấy ID từ URL

  try {
    const updatedPostOffice = await updatePostOfficeStatusService(id);

    if (!updatedPostOffice) {
      return res.status(404).json({
        message: "PostOffice not found or update failed",
      });
    }

    return res.status(200).json({
      message: "PostOffice status updated successfully",
      data: updatedPostOffice,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const UnActivePostOfficeStatus = async (req, res) => {
  const { id } = req.params; // Lấy ID từ URL

  try {
    const updatedPostOffice = await UnActivePostOfficeStatusService(id);

    if (!updatedPostOffice) {
      return res.status(404).json({
        message: "PostOffice not found or update failed",
      });
    }

    return res.status(200).json({
      message: "PostOffice status updated successfully",
      data: updatedPostOffice,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  createPostOffice,
  getPostOffice,
  updatePostOfficeStatus,
  UnActivePostOfficeStatus
};
