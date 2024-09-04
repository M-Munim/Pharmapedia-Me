import nodemailer from "nodemailer";
import User from "../models/UserModel"; // Adjust the path according to your project structure
import bcryptjs from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

export const sendEmail = async ({ email, emailType, userId }, res) => {
  try {
    console.log(`email : ${email}`);
    console.log(`emailType : ${emailType}`);
    console.log(typeof emailType);

    // Create a hashed token
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000, // 1 hour expiry
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000, // 1 hour expiry
      });
    }

    console.log("Out side if else");

    const transport = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_ADD,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_ADD_SEND_FROM,
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }
      or copy and past the below link send to SuperAdmin. <br> ${
        process.env.DOMAIN
      }/verifyemail?token= ${hashedToken}
      </p>`,
    };

    console.log("Sending email to:", mailOptions.to);
    console.log("SMTP user:", process.env.EMAIL_ADD);
    console.log("SMTP pass:", process.env.EMAIL_PASS);
    console.log("Send from:", process.env.EMAIL_ADD_SEND_FROM);
    console.log("Domain:", process.env.DOMAIN);

    transport.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        if (res) res.status(500).json({ error: "Email not sent" });
      } else {
        console.log("Email sent:", info.response);
        if (res) res.json({ message: "Email sent successfully" });
      }
    });
  } catch (error) {
    console.error("Error in sendEmail function:", error);
    if (res) res.status(500).json({ error: error.message });
    else throw new Error(error.message);
  }
};
