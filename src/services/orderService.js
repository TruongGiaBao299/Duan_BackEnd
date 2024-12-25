require("dotenv").config();
const Order = require("../models/order");

// Tạo đơn hàng
const createOrderService = async (
  // sender
  senderName,
  senderNumber,
  fromAddress,
  fromDistrict,
  fromWard,
  fromCity,

  // recipient
  recipientName,
  recipientNumber,
  toAddress,
  toDistrict,
  toWard,
  toCity,

  // info
  orderWeight,
  orderSize,
  type,
  message,
  email
) => {
  try {
    // Determine price based on city comparison
    const price = fromCity === toCity ? 15000 : 50000;

    // Get the current date and time, adjusted for +7 hours
    const now = new Date();
    const createdAt = new Date(now.getTime() + 7 * 60 * 60 * 1000); // Add 7 hours in milliseconds

    let result = await Order.create({
      // sender
      senderName: senderName,
      senderNumber: senderNumber,
      fromAddress: fromAddress,
      fromDistrict: fromDistrict,
      fromWard: fromWard,
      fromCity: fromCity,

      // recipient
      recipientName: recipientName,
      recipientNumber: recipientNumber,
      toAddress: toAddress,
      toDistrict: toDistrict,
      toWard: toWard,
      toCity: toCity,

      // info
      orderWeight: orderWeight,
      orderSize: orderSize,
      type: type,
      message: message,

      // calculated price
      price: price,
      status: "pending",
      createdBy: email,
      driver: "Find Driver",

      // add creation date and time
      createdAt: createdAt,
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

// lấy dữ liệu đơn hàng được tạo bởi email người dùng
const getOrderByEmailService = async (email) => {
  try {
    // Fetch order by id and createdBy (email) field
    const order = await Order.find({
      createdBy: email, // Match by the email of the creator
    });

    return order; // Return the order if found
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

// update trạng thái đơn hàng đang giao
const updateOrderDriverStatusService = async (OrderId, emailDriver) => {
  try {
    // Tìm và cập nhật driver theo ID
    const result = await Order.findByIdAndUpdate(
      OrderId,
      {
        status: "is shipping",
        driver: emailDriver,
      },
      { new: true } // Trả về document đã cập nhật
    );

    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// lấy dư liệu đơn hàng tài xế đã nhận
const getDriverOrderByEmailService = async (emailDriver) => {
  try {
    // Fetch order by id and createdBy (email) field
    const order = await Order.find({
      driver: emailDriver, // Match by the email of the creator
    });

    return order; // Return the order if found
  } catch (error) {
    console.log(error);
    return null;
  }
};

// update trạng thái đơn hàng đang đã giao
const updateOrderShippedStatusService = async (OrderId) => {
  try {
    // Tìm và cập nhật driver theo ID
    const result = await Order.findByIdAndUpdate(
      OrderId,
      {
        status: "shipped",
      },
      { new: true } // Trả về document đã cập nhật
    );

    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// update trạng thái đơn hàng đã hủy
const updateOrderCancelledStatusService = async (OrderId) => {
  try {
    // Tìm và cập nhật driver theo ID
    const result = await Order.findByIdAndUpdate(
      OrderId,
      {
        status: "canceled",
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
  createOrderService,
  getOrderService,
  deleteOrderService,
  getOrderByIdService,
  getOrderByEmailService,
  updateOrderDriverStatusService,
  getDriverOrderByEmailService,
  updateOrderShippedStatusService,
  updateOrderCancelledStatusService
};
