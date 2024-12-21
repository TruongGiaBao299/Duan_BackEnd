const {
  createOrderService,
  getOrderService,
  deleteOrderService,
  getOrderByIdService,
  updateOrderByIdService,
  getOrderByEmailService,
  updateOrderDriverStatusService,
  getDriverOrderByEmailService,
  updateOrderShippedStatusService,
  updateOrderCancelledStatusService,
} = require("../services/orderService");

// Tạo đơn hàng
const createOrder = async (req, res) => {
  // Access the user email from req.user (set by the JWT middleware)
  const { email } = req.user;

  // Extract other request body data
  const {
    senderName,
    senderNumber,
    fromAddress,
    fromDistrict,
    fromCity,
    recipientName,
    recipientNumber,
    toAddress,
    toDistrict,
    toCity,
    orderWeight,
    orderSize,
    type,
    message,
  } = req.body;

  // Call the createOrderService and pass the email along with other data
  const data = await createOrderService(
    senderName,
    senderNumber,
    fromAddress,
    fromDistrict,
    fromCity,
    recipientName,
    recipientNumber,
    toAddress,
    toDistrict,
    toCity,
    orderWeight,
    orderSize,
    type,
    message,
    email // Pass the email as createdBy
  );

  // Return the created order data
  return res.status(200).json(data);
};


// Lấy dữ liệu người dùng
const getOrder = async (req, res) => {
  // tạo request body
  const data = await getOrderService();
  return res.status(200).json(data);
};

const deleteOrder = async (req, res) => {
  const { id } = req.params;

  // Call the service function
  const result = await deleteOrderService(id);

  if (result.success) {
    return res.status(200).json({ message: result.message });
  } else {
    return res.status(400).json({ message: result.message });
  }
};

// Lấy dữ liệu người dùng
const getOrderById = async (req, res) => {
  const { id } = req.params;

  // tạo request body
  const data = await getOrderByIdService(id);
  return res.status(200).json(data);
};

const getOrderByEmail = async (req, res) => {
  const { email } = req.user; // Extract the email of the logged-in user

  // Fetch orders by email and filter by the specific order id
  const data = await getOrderByEmailService(email);

  if (!data) {
    return res.status(404).json({
      message: "Order not found or you don't have permission to view this order",
    });
  }

  return res.status(200).json(data);
};

// update lấy đơn khách hàng
const updateOrderDriverStatus = async (req, res) => {
  const { id } = req.params; // Lấy ID từ URL
  const { email } = req.user;

  try {
    const updatedDriver = await updateOrderDriverStatusService(id, email);

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

// lấy đơn hàng bằng email cho driver
const getDiverOrderByEmail = async (req, res) => {
  const { email } = req.user; // Extract the email of the logged-in user

  // Fetch orders by email and filter by the specific order id
  const data = await getDriverOrderByEmailService(email);

  if (!data) {
    return res.status(404).json({
      message: "Order not found or you don't have permission to view this order",
    });
  }

  return res.status(200).json(data);
};

// update đã ship hàng
const updateOrderShippedStatus = async (req, res) => {
  const { id } = req.params; // Lấy ID từ URL

  try {
    const updatedDriver = await updateOrderShippedStatusService(id);

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

// update đã hủy hàng
const updateOrderCancelledStatus = async (req, res) => {
  const { id } = req.params; // Lấy ID từ URL

  try {
    const updatedDriver = await updateOrderCancelledStatusService(id);

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

module.exports = {
  createOrder,
  getOrder,
  deleteOrder,
  getOrderById,
  getOrderByEmail,
  updateOrderDriverStatus,
  getDiverOrderByEmail,
  updateOrderShippedStatus,
  updateOrderCancelledStatus
};
