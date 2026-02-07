import bcrypt from "bcryptjs";
import User from "../models/User.js";
import jwt from "jsonwebtoken";


// signup

export const signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Email and password are required" });

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "User already exists" });

    const hashedPass = await bcrypt.hash(password, 10);
    const user = new User({
      email,
      password: hashedPass,
    });

    await user.save();

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 3600000,
    });

    res.json({ message: "User registered successfully", email: user.email });
    // console.log(user)
  } catch (error) {
    console.log("Signup error", error);
    res.status(500).json({ error: "Server error" });
  }
};

// login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Email and password are required" });

    const user = await User.findOne({ email });
    // if (!user) return res.status(400).json({ message: "Invalid credentials" })
    if (!user) return res.status(400).json({ message: "Incorect email" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ message: "Incorrect password" });

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 3600000,
    });
    res.json({ message: "Logged in successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Server error" });
  }
};

// logout

export const logout = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });
  res.json({ message: "logged out successfully" });
};

export const getMe = async (req, res) => {
 
  const user = await User.findOne({ email: req.user.email }).select(
    "-password",
  );

  if (!user) return res.status(401).json({ message: "User not found" });

  res.json(user);
};

// export const dashboard=( AuthMiddleware, async (req, res) => {
//     const user = await User.findOne({ email: req.user.email }).select("-password")
//     if (!user) return res.status(401).json({ message: "User not found" });
// // res.json({message:'hello'})
//     res.json(user)
// })
