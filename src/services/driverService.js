require("dotenv").config();
const Driver = require("../models/driver");

// Tạo đơn hàng
const createDriverService = async (
  // Sender
  DriverName,
  DriverNumber,
  email,
  DriverBirth,
  DriverId,
  DriverAddress,
  DriverCity,
  role,
  status
) => {
  try {
    let result = await Driver.create({
      DriverName: DriverName,
      DriverNumber: DriverNumber,
      DriverEmail: email,
      DriverBirth: DriverBirth,
      DriverId: DriverId,
      DriverAddress: DriverAddress,
      DriverCity: DriverCity,
      role: role,
      status: "pending",
    });

    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// Lấy dữ liệu đơn hàng
const getDriverService = async () => {
  try {
    let result = await Driver.find({});
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const updateDriverStatusService = async (driverId) => {
  try {
    // Tìm và cập nhật driver theo ID
    const result = await Driver.findByIdAndUpdate(
      driverId,
      {
        status: "active",
        role: "driver",
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
  createDriverService,
  updateDriverStatusService,
  getDriverService,
};
