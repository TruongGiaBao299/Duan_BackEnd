require("dotenv").config();
const Order = require("../models/order");

// Tạo đơn hàng
const createOrderService = async (
  // sender
  senderName,
  senderNumber,
  fromAddress,
  fromDistrict,
  fromCity,

  // recipient
  recipientName,
  recipientNumber,
  toAddress,
  toDistrict,
  toCity,

  // info
  orderWeight,
  orderSize,
  type,
  message
) => {
  try {
    let result = await Order.create({
      // sender
      senderName: senderName,
      senderNumber: senderNumber,
      fromAddress: fromAddress,
      fromDistrict: fromDistrict,
      fromCity: fromCity,

      // recipient
      recipientName: recipientName,
      recipientNumber: recipientNumber,
      toAddress: toAddress,
      toDistrict: toDistrict,
      toCity: toCity,

      // info
      orderWeight: orderWeight,
      orderSize: orderSize,
      type: type,
      message: message,
      status: "pending",
    });
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// Lấy dữ liệu đơn hàng
const getOrderService = async () => {
  try {
    let result = await Order.find({});
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// Xóa đơn hàng
const deleteOrderService = async (id) => {
  try {
    // Find and delete the user by ID
    const result = await Order.findByIdAndDelete(id);
    if (!result) {
      return { success: false, message: "Order not found" };
    }
    return { success: true, message: "Order deleted successfully" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Error deleting Order" };
  }
};

// Lấy dữ liệu đơn hàng theo ID
const getOrderByIdService = async (id) => {
  try {
    // Find the order by its ID
    const order = await Order.findById(id);

    // Check if the order exists
    if (!order) {
      return null; // Return null if no order is found
    }

    return order; // Return the found order
  } catch (error) {
    console.error("Error fetching order by ID:", error.message);
    return null; // Return null in case of any errors
  }
};

// Cập nhật đơn hàng theo ID
const updateOrderByIdService = async (id, updateData) => {
  try {
    // Find the order by ID and update with the provided data
    const updatedOrder = await Order.findByIdAndUpdate(id, updateData, {
      new: true, // Return the updated document
      runValidators: true, // Ensure schema validators are run
    });

    // Check if the order exists and was updated
    if (!updatedOrder) {
      return null; // Return null if no order is found
    }

    return updatedOrder; // Return the updated order
  } catch (error) {
    console.error("Error updating order by ID:", error.message);
    return null; // Return null in case of any errors
  }
};

module.exports = {
  createOrderService, getOrderService, deleteOrderService, getOrderByIdService, updateOrderByIdService
};
