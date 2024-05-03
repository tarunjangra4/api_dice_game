require("dotenv").config();
const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// signup api controller
exports.registerUser = async (req, res) => {
  const authHeaders = req.headers["authorization"];

  if (!authHeaders) {
    return res.status(401).json({ error: "Authorization headers are missing" });
  }
  const decodeCredentials = atob(authHeaders);
  const [email, password] = decodeCredentials.split("$");

  if (!email) {
    return res.status(401).json({ error: "Email is missing" });
  }

  if (!password) {
    return res.status(401).json({ error: "Password is missing" });
  }

  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    return res.status(400).json({
      message: "Email already exists. Please provide a different email.",
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await UserModel.create({
      email,
      password: hashedPassword,
      createdAt: new Date().getTime(),
    }).catch((error) => {
      console.log(error);
    });

    return res.status(200).json({ message: "User has been created." });
  } catch (error) {
    return res.status(500).json({
      error: "Registration failed due to an internal server error.",
    });
  }
};

// login api controller
exports.loginUser = async (req, res) => {
  const authHeader = req.headers.authorization;
  const decodedCredentials = atob(authHeader).split("$");

  const [userEmail, userPassword] = [
    decodedCredentials[0],
    decodedCredentials[1],
  ];

  if (!userEmail) {
    return res.status(401).json({
      error: "Please Provide a valid email.",
    });
  }

  try {
    const user = await UserModel.findOne({
      email: userEmail,
    });

    if (!user) {
      return res.status(401).json({
        error:
          "User not found. Please check your email or create a new account.",
      });
    } else {
      const isPasswordValid = await bcrypt.compare(userPassword, user.password);

      if (isPasswordValid) {
        const token = jwt.sign(
          { email: user.email },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: 604800 }
        );

        return res.status(200).json({ token });
      } else {
        return res.status(401).json({ error: "Password is invalid." });
      }
    }
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error. Please try again later.",
    });
  }
};
