require("dotenv").config();
const axios = require("axios");
const Order = require("../models/order");

// HERE API Key
const HERE_API_KEY = "MnTadIKOVDRqhQYalpBxtEG3AiWROupfqiPOBzfiWsw";

// Hàm chuyển địa chỉ thành tọa độ (latitude, longitude)
const geocodeAddressWithHERE = async (address) => {
  try {
    const response = await axios.get(
      `https://geocode.search.hereapi.com/v1/geocode`,
      {
        params: {
          q: address,
          apiKey: HERE_API_KEY,
        },
      }
    );

    if (response.data.items.length > 0) {
      const { lat, lng } = response.data.items[0].position;
      return { lat, lng };
    } else {
      throw new Error("Không tìm thấy tọa độ cho địa chỉ.");
    }
  } catch (error) {
    console.error("Error during HERE geocoding:", error.message);
    throw error;
  }
};

// Hàm tính khoảng cách giữa hai tọa độ
const calculateDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371; // Bán kính Trái Đất (km)
  const toRad = (value) => (value * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Khoảng cách (km)
};

// Hàm tính khoảng cách giữa hai địa chỉ
const calculateDistanceBetweenAddresses = async (address1, address2) => {
  try {
    const coords1 = await geocodeAddressWithHERE(address1);
    const coords2 = await geocodeAddressWithHERE(address2);

    const distance = calculateDistance(
      coords1.lat,
      coords1.lng,
      coords2.lat,
      coords2.lng
    );

    return distance.toFixed(2); // Làm tròn 2 chữ số thập phân
  } catch (error) {
    console.error("Error calculating distance:", error.message);
    throw error;
  }
};

// Hàm tạo đơn hàng
const createOrderService = async (
  senderName,
  senderNumber,
  fromAddress,
  fromDistrict,
  fromWard,
  fromCity,
  recipientName,
  recipientNumber,
  toAddress,
  toDistrict,
  toWard,
  toCity,
  orderWeight,
  orderSize,
  type,
  message,
  email
) => {
  try {
    const fromFullAddress = `${fromAddress}, ${fromWard}, ${fromDistrict}, ${fromCity}`;
    const toFullAddress = `${toAddress}, ${toWard}, ${toDistrict}, ${toCity}`;

    const distance = await calculateDistanceBetweenAddresses(
      fromFullAddress,
      toFullAddress
    );

    console.log(`Địa chỉ gửi: ${fromFullAddress}`);
    console.log(`Địa chỉ nhận: ${toFullAddress}`);
    console.log(`Khoảng cách: ${distance} km`);

    let price = 0;

    if (fromCity === toCity) {
      price = distance * 1000;
    } else {
      price = 30000;
    }
    
    // Cộng thêm phí theo trọng lượng
    if (orderWeight <= 5) {
      price += 7000;
    } else {
      const extraWeight = orderWeight - 5;
      const additionalFee = Math.ceil(extraWeight / 0.5) * 1500;
      price += 7000 + additionalFee;
    }
    
    // Cộng thêm phí theo kích thước
    if (orderSize > 1) {
      const additionalSizeFee = Math.floor(orderSize - 1) * 10000;
      price += additionalSizeFee;
    }

    console.log(`Giá cước: ${price} VND`);

    // Tính thời gian giao hàng dự kiến
    const currentDate = new Date();
    let minDays = 1;
    let maxDays = 1;

    if (fromCity === toCity) {
      minDays = 1;
      maxDays = 1;
    } else if (distance <= 300) {
      minDays = 2;
      maxDays = 2;
    } else if (distance > 300 && distance <= 1000) {
      minDays = 2;
      maxDays = 3;
    } else if (distance > 1000 && distance <= 2000) {
      minDays = 3;
      maxDays = 5;
    } else {
      minDays = 5;
      maxDays = 7;
    }

    // Tính ngày bắt đầu và ngày kết thúc giao hàng
    const startDate = new Date(currentDate);
    startDate.setDate(currentDate.getDate() + minDays);

    const endDate = new Date(currentDate);
    endDate.setDate(currentDate.getDate() + maxDays);

    // Hàm format ngày theo dd/mm/yyyy
    const formatDate = (date) => {
      const day = String(date.getDate());
      const month = String(date.getMonth() + 1);
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    };

    const formatDateDelivery = (date) => {
      const day = String(date.getDate());
      const month = String(date.getMonth() + 1);
      const year = date.getFullYear();
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      return `${day}/${month}/${year} ${hours}:${minutes}`;
    };

    let estimatedDeliveryTime = "";
    if (minDays === maxDays) {
      estimatedDeliveryTime = formatDate(startDate); // Thời gian giao hàng cố định
    } else {
      // Thời gian giao hàng trong khoảng
      estimatedDeliveryTime = `${String(startDate.getDate())}-${String(
        endDate.getDate()
      )}/${String(startDate.getMonth() + 1)}/${startDate.getFullYear()}`;
    }

    console.log(`Thời gian giao hàng dự kiến: ${estimatedDeliveryTime}`);

    // Lấy thời gian hiện tại và cộng 7 giờ (GMT+7)
    const createdAt = formatDateDelivery(new Date(new Date()));

    // Tạo đơn hàng
    const result = await Order.create({
      senderName,
      senderNumber,
      fromAddress,
      fromDistrict,
      fromWard,
      fromCity,
      recipientName,
      recipientNumber,
      toAddress,
      toDistrict,
      toWard,
      toCity,
      orderWeight,
      orderSize,
      type,
      message,
      price,
      distance,
      status: "pending",
      createdBy: email,
      driver: "Find Driver",
      createdAt,
      estimatedDeliveryTime, // Thêm thời gian dự kiến vào cơ sở dữ liệu
    });

    // Trả về kết quả bao gồm distance và estimatedDeliveryTime
    return {
      ...result.toObject(),
      distance,
      estimatedDeliveryTime,
      createdAt,
    };
  } catch (error) {
    console.error("Error creating order:", error.message);
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
      return { success: false, message: "không tìm thấy đơn hàng" };
    }
    return { success: true, message: "xóa đơn hàng thành công" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "lỗi trong quá trình xóa đơn hàng" };
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
    console.error("lỗi trong quá trình lấy đơn hàng theo id:", error.message);
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

// Hàm tra cứu gói cước
const searchOrderService = async (
  fromAddress,
  fromDistrict,
  fromWard,
  fromCity,
  toAddress,
  toDistrict,
  toWard,
  toCity,
  orderWeight,
  orderSize,
  type
) => {
  try {
    const fromFullAddress = `${fromAddress}, ${fromWard}, ${fromDistrict}, ${fromCity}`;
    const toFullAddress = `${toAddress}, ${toWard}, ${toDistrict}, ${toCity}`;

    const distance = await calculateDistanceBetweenAddresses(
      fromFullAddress,
      toFullAddress
    );

    console.log(`Địa chỉ gửi: ${fromFullAddress}`);
    console.log(`Địa chỉ nhận: ${toFullAddress}`);
    console.log(`Khoảng cách: ${distance} km`);

    let price = 0;

    if (fromCity === toCity) {
      price = distance * 1000;
    } else {
      price = 30000;
    }
    
    // Cộng thêm phí theo trọng lượng
    if (orderWeight <= 5) {
      price += 7000;
    } else {
      const extraWeight = orderWeight - 5;
      const additionalFee = Math.ceil(extraWeight / 0.5) * 1500;
      price += 7000 + additionalFee;
    }
    
    // Cộng thêm phí theo kích thước
    if (orderSize > 1) {
      const additionalSizeFee = Math.floor(orderSize - 1) * 10000;
      price += additionalSizeFee;
    }

    console.log(`Giá cước: ${price} VND`);

    // Tính thời gian giao hàng dự kiến
    const currentDate = new Date();
    let minDays = 1;
    let maxDays = 1;

    if (fromCity === toCity) {
      minDays = 1;
      maxDays = 1;
    } else if (distance <= 300) {
      minDays = 2;
      maxDays = 2;
    } else if (distance > 300 && distance <= 1000) {
      minDays = 2;
      maxDays = 3;
    } else if (distance > 1000 && distance <= 2000) {
      minDays = 3;
      maxDays = 5;
    } else {
      minDays = 5;
      maxDays = 7;
    }

    // Tính ngày bắt đầu và ngày kết thúc giao hàng
    const startDate = new Date(currentDate);
    startDate.setDate(currentDate.getDate() + minDays);

    const endDate = new Date(currentDate);
    endDate.setDate(currentDate.getDate() + maxDays);

    // Format ngày theo dd/mm/yy
    const formatDate = (date) => {
      const day = String(date.getDate());
      const month = String(date.getMonth() + 1);
      const year = String(date.getFullYear());
      return `${day}/${month}/${year}`;
    };

    let estimatedDeliveryTime = "";
    if (minDays === maxDays) {
      estimatedDeliveryTime = formatDate(startDate); // Nếu thời gian cố định, chỉ hiển thị 1 ngày
    } else {
      estimatedDeliveryTime = `${String(startDate.getDate())}-${String(
        endDate.getDate()
      )}/${String(startDate.getMonth() + 1)}/${String(
        startDate.getFullYear()
      ).slice(-2)}`;
    }

    console.log(`Thời gian giao hàng dự kiến: ${estimatedDeliveryTime}`);

    return {
      distance,
      price,
      estimatedDeliveryTime,
    };
  } catch (error) {
    console.error("Error calculating order details:", error.message);
    return { error: "An error occurred while calculating the details." };
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
  updateOrderCancelledStatusService,
  searchOrderService,
};
