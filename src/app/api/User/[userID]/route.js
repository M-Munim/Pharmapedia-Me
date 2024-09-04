const { connect } = require("@/app/api/config/db");
const User = require("@/app/models/UserModel").default;
const { NextResponse } = require("next/server");
import { writeFile, unlink } from "fs/promises";
import bcrypt from "bcrypt";
import path from "path";

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

export async function DELETE(request, context) {
  try {
    const id = context.params.userID;
    console.log(id);

    // Connect to the database
    await connect();

    // Find the user by ID
    const user = await User.findById(id);

    // Check if the user exists
    if (!user) {
      return NextResponse.json({ message: "User not found", status: 404 });
    }

    // Get the image file path
    const imagePath = path.join("./public/uploads/", user.Image);
    console.log(imagePath);
    // return;

    // Delete the user from the database
    const _deletedUser = await User.findByIdAndDelete(id);

    // Check if the user was found and deleted
    if (!_deletedUser) {
      return NextResponse.json({ message: "User not found", status: 404 });
    }

    // Delete the image file from the filesystem
    try {
      await unlink(imagePath);
      console.log(`Deleted file: ${imagePath}`);
    } catch (error) {
      console.error(`Failed to delete file: ${imagePath}`, error);
    }

    return NextResponse.json({
      message: "User deleted successfully",
      status: 200,
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    // Return an error response
    return NextResponse.json({ error: "Failed to delete user", status: 500 });
  }
}

// pages/api/users/[userID].js
export async function PUT(request, context) {
  try {
    await connect();
    const id = context.params.userID;

    const data = await request.formData();

    const file = data.get("Image");
    console.log(file);
    let filename = null;
    let buffer = null;

    if (typeof file === "object") {
      filename = file.name;
      const byteData = await file.arrayBuffer();
      buffer = Buffer.from(byteData);
      const filePath = `./public/uploads/${filename}`;
      await writeFile(filePath, buffer);
    }

    const formDataObject = {};

    // Iterate over form data entries
    for (const [key, value] of data.entries()) {
      // Assign each field to the formDataObject
      formDataObject[key] = value;
    }
    console.log("data from frontend", formDataObject);
    const { username, email, password, confirmpassword, designation, phone } =
      formDataObject;

    // Check if the user exists
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Update the user details
    user.username = username || user.username;
    user.email = email || user.email;
    user.designation = designation || user.designation;
    user.phone = phone || user.phone;

    if (password !== confirmpassword) {
      return NextResponse.json({
        message: "Both password and confirmpassword must be same",
      });
    }

    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    if (confirmpassword) {
      user.confirmpassword = confirmpassword;
    }

    if (filename) {
      user.Image = filename;
    }

    await user.save();

    return NextResponse.json({ message: "User updated successfully", user });
  } catch (error) {
    console.error("Error Updating User:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}

// get specific
export async function GET(request, context) {
  try {
    await connect();
    const id = context.params.userID;
    console.log(id);
    const Specific_User = await User.findById(id);
    if (!Specific_User) {
      return NextResponse.json({ result: "No User Availible" });
    } else {
      return NextResponse.json({ Result: Specific_User });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ Message: "Internal Server Error " });
  }
}
