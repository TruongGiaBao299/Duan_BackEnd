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
  message,
  email
) => {
  try {
    // Determine price based on city comparison
    const price = fromCity === toCity ? 35000 : 100000;

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

      // calculated price
      price: price,
      status: "pending",
      createdBy: email,
      driver: "",
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

const updateOrderCancelledStatusService = async (OrderId) => {
  try {
    // Tìm và cập nhật driver theo ID
    const result = await Order.findByIdAndUpdate(
      OrderId,
      {
        status: "cancelled",
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
