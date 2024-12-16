require("dotenv").config();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const salt = 10;

// Tạo người dùng
const createUserService = async (name, email, password) => {
  try {
    // check email unique (user exist)
    const user = await User.findOne({email});
    if(user){
      return null;
    }

    // hash user password
    const hashPassword = await bcrypt.hash(password, salt);
    // save user to database
    let result = await User.create({
      name: name,
      email: email,
      password: hashPassword,
      role: "guest",
    });
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// Đăng nhập
const loginService = async (email, password) => {
  try {
    //fetch user by email
    const user = await User.findOne({ email: email });
    if (user) {
      //compare password
      const isMatchPassword = await bcrypt.compare(password, user.password);
      if (!isMatchPassword) {
        return {
          EC: 2,
          EM: "Password not correct",
        };
      } else {
        //create an access token
        const payload = {
          email: user.email,
          name: user.name,
          role: user.role,
        };
        const access_token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRE,
        });
        return {
          EC: 0,
          access_token: access_token,
          user: {
            email: user.email,
            name: user.name,
            role: user.role,
          },
        };
      }
    } else {
      return {
        EC: 1,
        EM: "Email not found",
      };
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

// Lấy dữ liệu người dùng
const getUserService = async () => {
  try {
    let result = await User.find({}).select("-password");
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// Xóa người dùng
const deleteUserService = async (id) => {
  try {
    // Find and delete the user by ID
    const result = await User.findByIdAndDelete(id);
    if (!result) {
      return { success: false, message: "User not found" };
    }
    return { success: true, message: "User deleted successfully" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Error deleting user" };
  }
};


module.exports = {
  createUserService,
  loginService,
  getUserService,
  deleteUserService,
};
