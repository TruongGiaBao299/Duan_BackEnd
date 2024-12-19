const {
  createDriverService,
  updateDriverStatusService,
  getDriverService,
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

const updateDriverStatus = async (req, res) => {
  const { id } = req.params; // Lấy ID từ URL

  try {
    const updatedDriver = await updateDriverStatusService(id);

    if (!updatedDriver) {
      return res.status(404).json({
        message: "Driver not found or update failed",
      });
    }

    return res.status(200).json({
      message: "Driver status updated successfully",
      data: updatedDriver,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
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
  getDriver
};
