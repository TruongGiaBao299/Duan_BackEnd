const {
  createDriverService,
  updateDriverStatusService,
  getDriverService,
  updateDriverStatustoGuestService,
} = require("../services/driverService");

// Tạo đơn hàng
const createDriver = async (req, res) => {
  // Access the user email from req.user (set by the JWT middleware)
  const { email } = req.user;
  const { role } = req.user;

  // Extract other request body data
  const {
    DriverName,
    DriverNumber,
    DriverBirth,
    DriverId,
    DriverAddress,
    DriverCity,
  } = req.body;

  // Call the createOrderService and pass the email along with other data
  const data = await createDriverService(
    DriverName,
    DriverNumber,
    email,
    DriverBirth,
    DriverId,
    DriverAddress,
    DriverCity,
    role
  );

  // Return the created order data
  return res.status(200).json(data);
};

// update trạng thái tài xế
const updateDriverStatus = async (req, res) => {
  const { email } = req.params; // Get email from URL parameters

  try {
    // Call the service to update the driver status
    const updatedDriver = await updateDriverStatusService(email);

    if (!updatedDriver) {
      return res.status(404).json({
        message: "Driver not found or update failed.",
      });
    }

    return res.status(200).json({
      message: "Driver status updated successfully.",
      data: updatedDriver, // Return the updated driver object
    });
  } catch (error) {
    console.error("Error updating driver status:", error);
    return res.status(500).json({
      message: "Internal server error.",
      error: error.message, // Include the error message for debugging
    });
  }
};

// update trạng thái tài xế
const updateDriverToGuestStatus = async (req, res) => {
  const { email } = req.params; // Get email from URL parameters

  try {
    // Call the service to update the driver status
    const updatedDriver = await updateDriverStatustoGuestService(email);

    if (!updatedDriver) {
      return res.status(404).json({
        message: "Driver not found or update failed.",
      });
    }

    return res.status(200).json({
      message: "Driver status updated successfully.",
      data: updatedDriver, // Return the updated driver object
    });
  } catch (error) {
    console.error("Error updating driver status:", error);
    return res.status(500).json({
      message: "Internal server error.",
      error: error.message, // Include the error message for debugging
    });
  }
};

// Lấy dữ liệu người dùng
const getDriver = async (req, res) => {
  // tạo request body
  const data = await getDriverService();
  return res.status(200).json(data);
};

module.exports = {
  createDriver,
  updateDriverStatus,
  getDriver,
  updateDriverToGuestStatus
};
