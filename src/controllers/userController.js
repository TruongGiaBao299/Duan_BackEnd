const { createUserService, loginService, getUserService, deleteUserService } = require("../services/userService");


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


module.exports = {
  createUser, handleLogin, getUser, deleteUser, getAccount
};
