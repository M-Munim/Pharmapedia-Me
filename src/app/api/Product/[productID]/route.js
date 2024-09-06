// // Import required modules
// const { connect } = require("@/app/api/config/db"); // Import the database connection function
// const { default: ProductModel } = require("@/app/models/ProductModel"); // Import the ProductModel schema
// const { NextResponse } = require("next/server"); // Import NextResponse for sending responses
// import { unlink, writeFile } from "fs/promises"; // Import unlink and writeFile functions from fs/promises
// import path from "path"; // Import the path module for handling file paths

// // Configure the API to disable the default body parser
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// // DELETE handler for deleting a blog by ID
// export async function DELETE(request, context) {
//   try {
//     // Extract the blog ID from the request context
//     const id = context.params.productID;
//     console.log(id);

//     // Connect to the database
//     await connect();

//     // Find the blog by ID
//     const Find_Pro = await ProductModel.findById(id);
//     // console.log(Find_Pro);


//     // Check if the blog exists
//     if (!Find_Pro) {
//       return NextResponse.json({ message: "Product not found", status: 404 });
//     }

//     // Get the file paths for the images associated with the blog
//     const imagePath1 = path.join("./public/uploads/", Find_Pro.displayImage);
//     // console.log(imagePath1);

//     // Delete the blog from the database
//     const _deletedpro = await ProductModel.findByIdAndDelete(id);
//     console.log(_deletedpro);

//     // Check if the blog was found and deleted
//     if (!_deletedpro) {
//       return NextResponse.json({ message: "Product not found", status: 404 });
//     }

//     // Delete the associated images from the filesystem
//     try {
//       await unlink(imagePath1);
//       console.log(`Deleted files: ${imagePath1} `);
//     } catch (error) {
//       console.error(`Failed to delete files: ${imagePath1} `, error);
//     }

//     // Return a success response
//     return NextResponse.json({
//       message: "Product deleted successfully",
//       status: 200,
//     });
//   } catch (error) {
//     console.error("Error deleting blog:", error);
//     // Return an error response
//     return NextResponse.json({ error: "Failed to delete blog", status: 500 });
//   }
// }

// // GET handler for retrieving a specific blog by ID
// export async function GET(request, context) {
//   try {
//     // Connect to the database
//     await connect();

//     // Extract the blog ID from the request context
//     const id = context.params.productID;
//     console.log(id);

//     // Find the blog by ID
//     const Find_pro = await ProductModel.findById(id);

//     // Check if the blog exists
//     if (!Find_pro) {
//       return NextResponse.json({ result: "No Product Available", status: 404 });
//     } else {
//       // Return the found blog as a JSON response
//       return NextResponse.json({ result: Find_pro, status: 200 });
//     }
//   } catch (error) {
//     console.error("Error retrieving blog:", error);
//     // Return an error response
//     return NextResponse.json({ message: "Internal Server Error", status: 500 });
//   }
// }

// // PUT handler for updating a specific blog by ID
// // export async function PUT(request, context) {
// //   try {
// //     // Connect to the database
// //     await connect();

// //     // Extract the blog ID from the request context
// //     const id = context.params.blogID;
// //     // console.log(id);

// //     // Parse the incoming form data
// //     const data = await request.formData();
// //     const file1 = data.get("displayImage");
// //     let filename1 = null;
// //     let buffer1 = null;
// //     if (file1) {
// //       filename1 = file1.name;
// //       const byteData1 = await file1.arrayBuffer();
// //       buffer1 = Buffer.from(byteData1);
// //       // Define the file save paths
// //       const filePath1 = `./public/uploads/${filename1}`;
// //       // Save the files to the filesystem
// //       await writeFile(filePath1, buffer1);
// //     }

// //     // Create an object to store the form data
// //     const formDataObject = {};

// //     // Iterate over form data entries and populate the object
// //     for (const [key, value] of data.entries()) {
// //       formDataObject[key] = value;
// //     }

// //     // Destructure the form data object
// //     const { productName, productContent } = formDataObject;
// //     // console.log(productName, productContent);

// //     // Find the blog by ID
// //     const blog = await ProductModel.findById(id);

// //     // Check if the blog exists
// //     if (!blog) {
// //       return NextResponse.json({ error: "Blog not found", status: 404 });
// //     }

// //     // Update the blog details
// //     blog.productName = productName || blog.productName;
// //     blog.productContent = productContent || blog.productContent;

// //     // Update the images if new files are provided
// //     if (filename1) {
// //       blog.displayImage = filename1;
// //     }


// //     console.log(filename1);


// //     // Save the updated blog to the database
// //     await blog.save();

// //     // Return a success response with the updated blog
// //     return NextResponse.json({
// //       message: "Blog updated successfully",
// //       blog,
// //       status: 200,
// //     });
// //   } catch (error) {
// //     console.error("Error updating blog:", error);
// //     // Return an error response
// //     return NextResponse.json({ error: "Failed to update blog", status: 500 });
// //   }
// // }

// export async function PUT(request, context) {
//   try {
//     // Connect to the database
//     await connect();

//     // Extract the blog ID from the request context
//     const id = context.params.productID;
//     console.log(id);


//     // Parse the incoming form data
//     const data = await request.formData();
//     // console.log(data)
//     const file1 = data.get("displayImage");
//     // console.log(file1)
//     let filename1 = null;
//     let buffer = null;

//     if (typeof file1 === "object") {
//       filename1 = file1.name;
//       // console.log(filename1);

//       const byteData = await file1.arrayBuffer();
//       buffer = Buffer.from(byteData);
//       const filePath = `./public/uploads/${filename1}`;
//       await writeFile(filePath, buffer);
//     }
//     // Create an object to store the form data
//     const formDataObject = {};

//     // Iterate over form data entries and populate the object
//     for (const [key, value] of data.entries()) {
//       formDataObject[key] = value;
//     }

//     // Destructure the form data object
//     const { productName, productContent } = formDataObject;

//     // Find the blog by ID
//     const blog = await ProductModel.findById(id);

//     // Check if the blog exists
//     if (!blog) {
//       return NextResponse.json({ error: "Blog not found", status: 404 });
//     }

//     // Update the blog details
//     blog.productName = productName || blog.productName;
//     blog.productContent = productContent || blog.productContent;

//     // Update the images if new files are provided
//     if (filename1) {
//       blog.displayImage = filename1;
//     }

//     // Save the updated blog to the database
//     await blog.save();

//     // Return a success response with the updated blog
//     return NextResponse.json({
//       message: "Blog updated successfully",
//       blog,
//       status: 200,
//     });
//   } catch (error) {
//     console.error("Error updating blog:", error);
//     // Return an error response
//     return NextResponse.json({ error: "Failed to update blog", status: 500 });
//   }
// }



// Import required modules
const { connect } = require("@/app/api/config/db"); // Import the database connection function
const { default: ProductModel } = require("@/app/models/ProductModel"); // Import the ProductModel schema
const { NextResponse } = require("next/server"); // Import NextResponse for sending responses
import { unlink, writeFile } from "fs/promises"; // Import unlink and writeFile functions from fs/promises
import path from "path"; // Import the path module for handling file paths
import cloudinary from 'cloudinary'; // Import Cloudinary

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure the API to disable the default body parser
export const dynamic = "force-dynamic"; // or other new configuration options if applicable

// DELETE handler for deleting a product by ID
export async function DELETE(request, { params }) {
  try {
    // Extract the product ID from the request parameters
    const id = params.productID;
    console.log(id);

    // Connect to the database
    await connect();

    // Find the product by ID
    const Find_Pro = await ProductModel.findById(id);
    // console.log(Find_Pro);

    // Check if the product exists
    if (!Find_Pro) {
      return NextResponse.json({ message: "Product not found", status: 404 });
    }

    // Get the file path for the images associated with the product
    const imagePath1 = path.join("./public/uploads/", Find_Pro.displayImage);
    // console.log(imagePath1);

    // Delete the product from the database
    const _deletedpro = await ProductModel.findByIdAndDelete(id);
    console.log(_deletedpro);

    // Check if the product was found and deleted
    if (!_deletedpro) {
      return NextResponse.json({ message: "Product not found", status: 404 });
    }

    // Delete the associated images from the filesystem
    try {
      await unlink(imagePath1);
      console.log(`Deleted files: ${imagePath1}`);
    } catch (error) {
      console.error(`Failed to delete files: ${imagePath1}`, error);
    }

    // Return a success response
    return NextResponse.json({
      message: "Product deleted successfully",
      status: 200,
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    // Return an error response
    return NextResponse.json({ error: "Failed to delete product", status: 500 });
  }
}

// GET handler for retrieving a specific product by ID
export async function GET(request, { params }) {
  try {
    // Connect to the database
    await connect();

    // Extract the product ID from the request parameters
    const id = params.productID;
    console.log(id);

    // Find the product by ID
    const Find_pro = await ProductModel.findById(id);

    // Check if the product exists
    if (!Find_pro) {
      return NextResponse.json({ result: "No Product Available", status: 404 });
    } else {
      // Return the found product as a JSON response
      return NextResponse.json({ result: Find_pro, status: 200 });
    }
  } catch (error) {
    console.error("Error retrieving product:", error);
    // Return an error response
    return NextResponse.json({ message: "Internal Server Error", status: 500 });
  }
}

// PUT handler for updating a specific product by ID
export async function PUT(request, { params }) {
  try {
    // Connect to the database
    await connect();

    // Extract the product ID from the request parameters
    const id = params.productID;
    console.log(id);

    // Parse the incoming form data
    const data = await request.formData();
    const file1 = data.get('displayImage');

    // Create an object to store the form data
    const formDataObject = {};

    // Iterate over form data entries and populate the object
    for (const [key, value] of data.entries()) {
      formDataObject[key] = value;
    }

    // Destructure the form data object
    const { productName, productContent } = formDataObject;

    // Find the product by ID
    const product = await ProductModel.findById(id);

    // Check if the product exists
    if (!product) {
      return NextResponse.json({ error: "Product not found", status: 404 });
    }

    // Update the product details
    product.productName = productName || product.productName;
    product.productContent = productContent || product.productContent;

    // Upload the new image to Cloudinary if a new file is provided
    if (file1 && typeof file1 === 'object') {
      const byteData = await file1.arrayBuffer();
      const buffer = Buffer.from(byteData);

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

      product.displayImage = uploadResponse.secure_url; // Update with Cloudinary URL
    }

    // Save the updated product to the database
    await product.save();

    // Return a success response with the updated product
    return NextResponse.json({
      message: "Product updated successfully",
      product,
      status: 200,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    // Return an error response
    return NextResponse.json({ error: error.message, status: 500 });
  }
} 
