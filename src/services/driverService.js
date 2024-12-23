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
      email: email,
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

const updateDriverStatusService = async (email) => {
  try {
    // Find and update the driver by email
    const result = await Driver.findOneAndUpdate(
      { email: email }, // Query by DriverEmail
      {
        status: "active", // Update status
        role: "driver", // Update role
      },
      { new: true } // Return the updated document
    );

    return result;
  } catch (error) {
    console.error("Error updating driver status:", error);
    return null;
  }
};

const updateDriverStatustoGuestService = async (email) => {
  try {
    // Find and update the driver by email
    const result = await Driver.findOneAndUpdate(
      { email: email }, // Query by DriverEmail
      {
        status: "pending", // Update status
        role: "guest", // Update role
      },
      { new: true } // Return the updated document
    );

    return result;
  } catch (error) {
    console.error("Error updating driver status:", error);
    return null;
  }
};

// Xóa tài xế
const deleteDriverService = async (email) => {
  try {
    // Find and delete the user by ID
    const result = await Driver.findOneAndDelete({ email: email });
    if (!result) {
      return { success: false, message: "Driver not found" };
    }
    return { success: true, message: "Driver request deleted successfully" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Error deleting Driver request" };
  }
};

module.exports = {
  createDriverService,
  updateDriverStatusService,
  getDriverService,
  updateDriverStatustoGuestService,
  deleteDriverService
};
