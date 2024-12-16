const {
  createOrderService,
  getOrderService,
  deleteOrderService,
  getOrderByIdService,
  updateOrderByIdService,
} = require("../services/orderService");

// Tạo đơn hàng
const createOrder = async (req, res) => {
  // tạo request body
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
  // tạo đơn
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
    message
  );
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

const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params; // Extract the order ID from the request parameters
    const { status } = req.body; // Extract the new status from the request body

    // Validate the new status
    const allowedStatuses = ["pending", "inProgress", "shipped", "delivered", "cancelled"];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    // Call the service to update the order status
    const updatedOrder = await updateOrderByIdService(id, { status }); // Only update the status field

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found or update failed" });
    }

    return res.status(200).json({
      message: "Order status updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Error updating order status:", error.message);
    return res.status(500).json({ message: "Failed to update order status", error: error.message });
  }
};


module.exports = {
  createOrder,
  getOrder,
  deleteOrder,
  getOrderById,
  updateOrderStatus
};
