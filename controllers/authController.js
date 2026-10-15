import User from "../models/User.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import crypto from "crypto";

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });

// Register
export const registerUser = async (req, res) => {
  const { name, email, password, phone } = req.body;
  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ name, email, password, phone });
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ============ FORGOT PASSWORD ============

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "msmartchandigarh@gmail.com",
    pass: "uawauncwwlxwbrhq",
  },
});
// 1️⃣ Send OTP
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Email not registered" });
    }

    // 6-digit OTP generate
    const otp = crypto.randomInt(100000, 999999).toString();

    // Save to DB with 10 min expiry
    user.resetOtp = otp;
    user.resetOtpExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();

    // Email bhejo
    await transporter.sendMail({
      from: `"MSMART Chandigarh" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "Your MSMART Password Reset OTP",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 24px; border: 2px solid #1B5E20; border-radius: 16px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: #1B5E20; font-size: 28px; margin: 0;">🛒 MSMART</h1>
            <p style="color: #666; font-size: 14px; margin: 4px 0;">Chandigarh</p>
          </div>
          <hr style="border: none; border-top: 2px dashed #1B5E20; margin: 20px 0;" />
          <h2 style="color: #333; font-size: 18px;">Password Reset Request</h2>
          <p style="color: #555; font-size: 14px; line-height: 1.6;">
            Aapne apna password reset karne ki request ki hai. Ye raha aapka OTP:
          </p>
          <div style="background: #E8F5E9; padding: 20px; border-radius: 12px; text-align: center; margin: 20px 0;">
            <h1 style="color: #1B5E20; font-size: 38px; letter-spacing: 8px; margin: 0; font-family: monospace;">${otp}</h1>
          </div>
          <p style="color: #555; font-size: 14px; line-height: 1.6;">
            Ye OTP <strong style="color: #E65100;">10 minute</strong> ke liye valid hai.
          </p>
          <p style="color: #888; font-size: 12px; line-height: 1.6; margin-top: 24px;">
            Agar aapne ye request nahi ki, toh is email ko ignore karo. Aapka password safe hai.
          </p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
          <p style="color: #999; font-size: 11px; text-align: center;">
            © MSMART Chandigarh | Sector 48B, Burail<br/>
            msmartchandigarh@gmail.com
          </p>
        </div>
      `,
    });

    res.json({ message: "OTP sent to your email", email });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ message: "Failed to send OTP. Check email config." });
  }
};

// 2️⃣ Verify OTP + Reset Password
export const verifyOtp = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Check OTP
    if (!user.resetOtp || user.resetOtp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Check expiry
    if (Date.now() > user.resetOtpExpiry) {
      return res.status(400).json({ message: "OTP expired. Request new one." });
    }

    // Update password
    user.password = newPassword;
    user.resetOtp = null;
    user.resetOtpExpiry = null;
    await user.save();

    res.json({ message: "✅ Password reset successful! Ab login karo." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 3️⃣ Resend OTP
export const resendOtp = async (req, res) => {
  return forgotPassword(req, res);
};