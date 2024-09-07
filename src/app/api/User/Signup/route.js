import bcrypt from 'bcrypt';
import User from '@/app/models/UserModel.js';
import { connect } from '@/app/api/config/db';
import { NextResponse } from 'next/server';
import { sendEmail } from '@/app/helper/mailer';
import cloudinary from 'cloudinary';

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(Request) {
  try {
    await connect();
    const data = await Request.formData();
    console.log(data);

    const file = data.get("Image");
    let imageUrl = "";
    let displayImageId = "";

    if (file) {
      const byteData = await file.arrayBuffer();
      const buffer = Buffer.from(byteData);

      // Upload to Cloudinary
      const uploadResponse = await new Promise((resolve, reject) => {
        cloudinary.v2.uploader.upload_stream(
          { resource_type: "auto" },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        ).end(buffer);
      });

      imageUrl = uploadResponse.secure_url; // Cloudinary URL for the image
      displayImageId = uploadResponse.public_id; // Cloudinary URL for the image

      console.log(`Uploaded image URL: ${imageUrl}`);
    } else {
      // Use a default image if no file is uploaded
      imageUrl = "https://res.cloudinary.com/dpj2ewekx/image/upload/v1725603041/samples/smile.jpg"; // Replace with your default image URL
    }

    const formDataObject = {};
    for (const [key, value] of data.entries()) {
      formDataObject[key] = value;
    }

    const { username, email, password, confirmpassword, designation, phone } = formDataObject;

    console.log(username, email, password, confirmpassword, designation, phone);

    if (password !== confirmpassword) {
      return NextResponse.json({
        error: "Passwords do not match",
        status: 400,
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json({
        error: "User already exists",
        status: 400,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      Image: imageUrl, // Use the uploaded or default image
      publicId: displayImageId,
      confirmpassword,
      designation,
      phone,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);

    await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      error: error.message || 'An error occurred',
      status: 500,
    });
  }
}
