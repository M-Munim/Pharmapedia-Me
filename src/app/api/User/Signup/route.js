import bcrypt from 'bcrypt';
import User from '@/app/models/UserModel';
import { connect } from '@/app/api/config/db';
import { NextResponse } from 'next/server';
import { sendEmail } from '@/app/helper/mailer';
import { writeFile } from 'fs/promises';

// Configuration to disable body parsing by Next.js for this API route
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// The main function to handle POST requests
export async function POST(request) {
  try {
    // Connect to the database
    await connect();

    // Parse the form data from the request
    const data = await request.formData();
    console.log(data);

    // Retrieve the file (image) from the form data
    const file = data.get('Image');
    let filename = null;

    if (file) {
      // If a file is uploaded, process the file
      filename = file.name;
      console.log(filename);

      // Convert the file to a buffer for saving
      const byteData = await file.arrayBuffer();
      const buffer = Buffer.from(byteData);

      // Define the file path where the image will be saved
      const filePath = `./public/uploads/${filename}`;

      // Save the file to the specified path
      await writeFile(filePath, buffer);
    } else {
      // Set a default image if no file is uploaded
      filename = 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png'; // Replace with your actual default image filename
    }

    // Initialize an empty object to store form data
    const formDataObject = {};

    // Iterate over the form data entries to build the formDataObject
    for (const [key, value] of data.entries()) {
      formDataObject[key] = value;
    }

    // Destructure relevant fields from the formDataObject
    const { username, email, password, confirmpassword, designation, phone } = formDataObject;

    console.log(username, email, password, confirmpassword, designation, phone);

    // Check if password and confirm password match
    if (password !== confirmpassword) {
      return NextResponse.json({
        error: 'Passwords do not match',
        status: 400,
      });
    }

    // Check if a user with the given email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // Return a response if the user already exists
      return NextResponse.json({
        error: 'User already exists',
        status: 400,
      });
    }

    // Generate a salt for hashing the password
    const salt = await bcrypt.genSalt(10);
    console.log(salt, password);

    // Hash the password using the generated salt
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user instance with the provided data
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      Image: filename, // Use the uploaded or default image
      designation,
      confirmpassword,
      phone,
    });
    console.log(newUser);
    // return

    // Save the new user to the database
    const savedUser = await newUser.save();
    console.log(savedUser);

    // Send a verification email to the user
    await sendEmail({ email, emailType: 'VERIFY', userId: savedUser._id });

    // Check if the user was successfully saved
    if (!savedUser) {
      return NextResponse.json({ message: 'User not created', status: 500 });
    } else {
      return NextResponse.json({
        message: 'User created successfully',
        success: true,
        status: 200,
      });
    }
  } catch (error) {
    // Log and return an error response if something goes wrong
    console.error(error);
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
