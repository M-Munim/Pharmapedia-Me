// const { connect } = require("@/app/api/config/db");
// const { default: ReviewModel } = require("@/app/models/ReviewModel");
// const { writeFile } = require("fs/promises");
// const { NextResponse } = require("next/server");
// import path from "path"; // Import the path module for handling file paths
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// // POST handler for creating a blog
// export async function POST(request, context) {
//   try {
//     const id = context.params.reviewID;
//     console.log(id);

//     await connect();
//     const data = await request.formData();

//     // Handling the uploaded files
//     const file1 = data.get("picture");
//     const picture = file1.name;

//     // Convert file data to buffer
//     const buffer1 = Buffer.from(await file1.arrayBuffer());

//     // File save paths
//     const filePath1 = `./public/uploads/${picture}`;

//     // Save the files
//     await writeFile(filePath1, buffer1);

//     // Constructing formDataObject excluding the files
//     const formDataObject = {};
//     for (const [key, value] of data.entries()) {
//       if (key !== "picture") {
//         formDataObject[key] = value;
//       }
//     }

//     const { name, review, rating } = formDataObject;

//     // Check if a blog with the same title already exists
//     const existingReview = await ReviewModel.findOne({ name });
//     if (existingReview) {
//       return NextResponse.json({
//         error: "Review already added",
//         status: 400,
//       });
//     }

//     // Create and save the new blog entry
//     const newReview = new ReviewModel({
//       blogId: id,
//       name,
//       review,
//       rating,
//       picture,
//     });

//     const savedReveiw = await newReview.save();
//     if (!savedReveiw) {
//       return NextResponse.json({ message: "Review not added", status: 400 });
//     } else {
//       return NextResponse.json({
//         message: "Review created successfully",
//         success: true,
//         status: 200,
//       });
//     }
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: error.message, status: 500 });
//   }
// }

// // GET handler for retrieving a specific blog by ID
// export async function GET(request, context) {
//   try {
//     // Connect to the database
//     await connect();

//     // Extract the blog ID from the request context
//     const id = context.params.reviewID;
//     console.log(id);

//     // Find the blog by ID
//     const Find_pro = await ReviewModel.findById(id);

//     // Check if the blog exists
//     if (!Find_pro) {
//       return NextResponse.json({ result: "No Review Available", status: 404 });
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

// // DELETE handler for deleting a blog by ID
// export async function DELETE(request, context) {
//   try {
//     // Extract the blog ID from the request context
//     const id = context.params.reviewID;
//     console.log(id);

//     // Connect to the database
//     await connect();

//     // Find the blog by ID
//     const Find_Pro = await ReviewModel.findById(id);

//     // Check if the blog exists
//     if (!Find_Pro) {
//       return NextResponse.json({ message: "Review not found", status: 404 });
//     }

//     // Get the file paths for the images associated with the blog
//     const imagePath1 = path.join("./public/uploads/", Find_Pro.picture);
//     console.log(imagePath1);

//     // Delete the blog from the database
//     const _deletedpro = await ReviewModel.findByIdAndDelete(id);
//     console.log(_deletedpro);

//     // Check if the blog was found and deleted
//     if (!_deletedpro) {
//       return NextResponse.json({ message: "Review not found", status: 404 });
//     }

//     // Delete the associated images from the filesystem
//     try {
//       await unlink(imagePath1);
//       console.log(`Deleted files: ${imagePath1}`);
//     } catch (error) {
//       console.error(`Failed to delete files: ${imagePath1}`, error);
//     }

//     // Return a success response
//     return NextResponse.json({
//       message: "Review deleted successfully",
//       status: 200,
//     });
//   } catch (error) {
//     console.error("Error deleting reveiw:", error);
//     // Return an error response
//     return NextResponse.json({ error: "Failed to delete review", status: 500 });
//   }
// }



import { connect } from "@/app/api/config/db";
import ReviewModel from "@/app/models/ReviewModel";
import { writeFile, unlink } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

// POST handler for creating a review
export async function POST(request, context) {
  try {
    const id = context.params.reviewID;
    console.log(id);

    await connect();
    const data = await request.formData();

    // Handling the uploaded files
    const file1 = data.get("picture");
    const picture = file1.name;

    // Convert file data to buffer
    const buffer1 = Buffer.from(await file1.arrayBuffer());

    // File save paths
    const filePath1 = `./public/uploads/${picture}`;

    // Save the file
    await writeFile(filePath1, buffer1);

    // Constructing formDataObject excluding the files
    const formDataObject = {};
    for (const [key, value] of data.entries()) {
      if (key !== "picture") {
        formDataObject[key] = value;
      }
    }

    const { name, review, rating } = formDataObject;

    // Check if a review with the same title already exists
    const existingReview = await ReviewModel.findOne({ name });
    if (existingReview) {
      return NextResponse.json({
        error: "Review already added",
        status: 400,
      });
    }

    // Create and save the new review entry
    const newReview = new ReviewModel({
      blogId: id,
      name,
      review,
      rating,
      picture,
    });

    const savedReview = await newReview.save();
    if (!savedReview) {
      return NextResponse.json({ message: "Review not added", status: 400 });
    } else {
      return NextResponse.json({
        message: "Review created successfully",
        success: true,
        status: 200,
      });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message, status: 500 });
  }
}

// GET handler for retrieving a specific review by ID
export async function GET(request, context) {
  try {
    await connect();

    const id = context.params.reviewID;
    console.log(id);

    const foundReview = await ReviewModel.findById(id);

    if (!foundReview) {
      return NextResponse.json({ result: "No Review Available", status: 404 });
    } else {
      return NextResponse.json({ result: foundReview, status: 200 });
    }
  } catch (error) {
    console.error("Error retrieving review:", error);
    return NextResponse.json({ message: "Internal Server Error", status: 500 });
  }
}

// DELETE handler for deleting a review by ID
export async function DELETE(request, context) {
  try {
    const id = context.params.reviewID;
    console.log(id);

    await connect();

    const foundReview = await ReviewModel.findById(id);

    if (!foundReview) {
      return NextResponse.json({ message: "Review not found", status: 404 });
    }

    const imagePath1 = path.join("./public/uploads/", foundReview.picture);
    console.log(imagePath1);

    const deletedReview = await ReviewModel.findByIdAndDelete(id);
    console.log(deletedReview);

    if (!deletedReview) {
      return NextResponse.json({ message: "Review not found", status: 404 });
    }

    try {
      await unlink(imagePath1);
      console.log(`Deleted file: ${imagePath1}`);
    } catch (error) {
      console.error(`Failed to delete file: ${imagePath1}`, error);
    }

    return NextResponse.json({
      message: "Review deleted successfully",
      status: 200,
    });
  } catch (error) {
    console.error("Error deleting review:", error);
    return NextResponse.json({ error: "Failed to delete review", status: 500 });
  }
}
