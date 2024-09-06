
// // Import required modules
// const { connect } = require("@/app/api/config/db"); // Import the database connection function
// const { default: ProductModel } = require("@/app/models/ProductModel"); // Import the ProductModel schema
// const { writeFile } = require("fs/promises"); // Import writeFile function from fs/promises
// const { NextResponse } = require("next/server"); // Import NextResponse for sending responses

// // Configure the API to disable the default body parser
// export const dynamic = "force-dynamic"; // or other new configuration options if applicable

// // POST handler for creating a product
// export async function POST(request) {
//   try {
//     await connect();

//     const data = await request.formData();
//     const file1 = data.get('displayImage');
//     console.log(file1);

//     if (!file1) {
//       return NextResponse.json({ error: 'Display image is required', status: 400 });
//     }

//     const displayImage = file1.name;
//     const byteData = await file1.arrayBuffer();
//     const buffer = Buffer.from(byteData);

//     // Define the file path where the image will be saved
//     const filePath = `./public/uploads/${displayImage}`;

//     // Save the file to the specified path
//     await writeFile(filePath, buffer);

//     const formDataObject = {};
//     for (const [key, value] of data.entries()) {
//       if (key !== 'displayImage') {
//         formDataObject[key] = value;
//       }
//     }

//     const { productName, productContent } = formDataObject;

//     // Check if the product already exists
//     const existingProduct = await ProductModel.findOne({ productName });
//     if (existingProduct) {
//       return NextResponse.json({
//         error: 'Product already exists',
//         status: 400,
//       });
//     }

//     // Create and save the new product
//     const newProduct = new ProductModel({
//       productName,
//       productContent,
//       displayImage,
//     });

//     console.log(newProduct);

//     const savedProduct = await newProduct.save();
//     if (!savedProduct) {
//       return NextResponse.json({ message: 'Product not added', status: 400 });
//     } else {
//       return NextResponse.json({
//         message: 'Product created successfully',
//         success: true,
//         status: 200,
//       });
//     }
//   } catch (error) {
//     console.error("Error creating product:", error);
//     return NextResponse.json({ error: error.message, status: 500 });
//   }
// }

// // GET handler for retrieving all products
// export async function GET() {
//   try {
//     await connect();
//     const allPro = await ProductModel.find();
//     const proCount = await ProductModel.countDocuments();

//     return NextResponse.json({
//       result: allPro,
//       count: proCount,
//       status: 200,
//     });
//   } catch (error) {
//     console.error("Error retrieving products:", error);
//     return NextResponse.json({ message: "Internal Server Error", status: 500 });
//   }
// }

import { connect } from '@/app/api/config/db'; // Import the database connection function
import ProductModel from '@/app/models/ProductModel'; // Import the ProductModel schema
import { NextResponse } from 'next/server'; // Import NextResponse for sending responses
import cloudinary from 'cloudinary';

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// POST handler for creating a product
export async function POST(request) {
  try {
    await connect();

    const data = await request.formData();
    const file1 = data.get('displayImage');
    console.log(file1);

    if (!file1) {
      return NextResponse.json({ error: 'Display image is required', status: 400 });
    }

    // Convert file data to buffer
    const byteData = await file1.arrayBuffer();
    const buffer = Buffer.from(byteData);

    // Upload file to Cloudinary
    const uploadResponse = await new Promise((resolve, reject) => {
      cloudinary.v2.uploader.upload_stream({
        resource_type: "image",
        folder: "products", // Optional: folder in Cloudinary where images will be saved
      }, (error, result) => {
        if (error) {
          reject(new Error("Error uploading image: " + error.message));
        } else {
          resolve(result);
        }
      }).end(buffer);
    });

    const displayImageUrl = uploadResponse.secure_url; // Cloudinary URL for the image

    const formDataObject = {};
    for (const [key, value] of data.entries()) {
      if (key !== 'displayImage') {
        formDataObject[key] = value;
      }
    }

    const { productName, productContent } = formDataObject;

    // Check if the product already exists
    const existingProduct = await ProductModel.findOne({ productName });
    if (existingProduct) {
      return NextResponse.json({
        error: 'Product already exists',
        status: 400,
      });
    }

    // Create and save the new product
    const newProduct = new ProductModel({
      productName,
      productContent,
      displayImage: displayImageUrl, // Store Cloudinary URL
    });

    console.log(newProduct);

    const savedProduct = await newProduct.save();
    if (!savedProduct) {
      return NextResponse.json({ message: 'Product not added', status: 400 });
    } else {
      return NextResponse.json({
        message: 'Product created successfully',
        success: true,
        status: 200,
      });
    }
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json({ error: error.message, status: 500 });
  }
}

// GET handler for retrieving all products
export async function GET() {
  try {
    await connect();
    const allPro = await ProductModel.find();
    const proCount = await ProductModel.countDocuments();

    return NextResponse.json({
      result: allPro,
      count: proCount,
      status: 200,
    });
  } catch (error) {
    console.error("Error retrieving products:", error);
    return NextResponse.json({ message: "Internal Server Error", status: 500 });
  }
}
