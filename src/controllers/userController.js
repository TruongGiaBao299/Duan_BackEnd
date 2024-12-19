const { updateOrderByIdService } = require("../services/orderService");
const { createUserService, loginService, getUserService, deleteUserService, updateUserStatusService } = require("../services/userService");


// Tạo tài khoản
const createUser = async (req, res) => {
  // tạo request body
  const { name, email, password } = req.body;
  // tạo user
  const data = await createUserService(name, email, password);
  return res.status(200).json(data);
};


// API đăng nhập
const handleLogin = async (req, res) => {
  // tạo request body
  const { email, password } = req.body;
  const data = await loginService(email, password);
  return res.status(200).json(data);
};

// Lấy dữ liệu người dùng
const getUser = async (req, res) => {
  // tạo request body
  const data = await getUserService();
  return res.status(200).json(data);
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  // Call the service function
  const result = await deleteUserService(id);

  if (result.success) {
    return res.status(200).json({ message: result.message });
  } else {
    return res.status(400).json({ message: result.message });
  }
};

// Lấy dữ liệu tài khoản
const getAccount = async (req, res) => {
  // tạo request body
  return res.status(200).json(req.user);
};

// update role user
const becomeDriver = async (req, res) => {
  try {
    const { id } = req.params; // Assuming `id` is passed in the URL

    // Call the service to update the user's role
    const updatedUser = await updateUserStatusService(id);

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found or update failed." });
    }

    return res.status(200).json({
      message: "You are now a driver!",
      user: updatedUser, // Return the updated user object
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong.", error: error.message });
  }
};

module.exports = {
  createUser, handleLogin, getUser, deleteUser, getAccount, becomeDriver
};
