import UserModel from "../models/userModel.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
  console.log(req.body);
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);

  try {
    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({
      success: true,
      message: `User has been created!`,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
