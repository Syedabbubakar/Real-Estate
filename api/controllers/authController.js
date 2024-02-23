import UserModel from "../models/userModel.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res, next) => {
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
    next(error);
}
};
