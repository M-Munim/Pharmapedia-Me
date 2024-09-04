// // Import required modules
// const { connect } = require("@/app/api/config/db");
// const { default: BlogModel } = require("@/app/models/BlogModel");
// const { NextResponse } = require("next/server");
// import { unlink, writeFile } from "fs/promises";
// import path from "path";

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
//     const id = context.params.blogID;
//     console.log(id);

//     // Connect to the database
//     await connect();

//     // Find the blog by ID
//     const Find_Project = await BlogModel.findById(id);

//     // Check if the blog exists
//     if (!Find_Project) {
//       return NextResponse.json({ message: "Blog not found", status: 404 });
//     }

//     // Get the file paths for the images associated with the blog
//     const imagePath1 = path.join(
//       "./public/uploads/",
//       Find_Project.displayImage
//     );
//     const imagePath2 = path.join("./public/uploads/", Find_Project.authorImage);
//     console.log(imagePath1, imagePath2);

//     // Delete the blog from the database
//     const _deletedblog = await BlogModel.findByIdAndDelete(id);
//     console.log(_deletedblog);

//     // Check if the blog was found and deleted
//     if (!_deletedblog) {
//       return NextResponse.json({ message: "Blog not found", status: 404 });
//     }

//     // Delete the associated images from the filesystem
//     try {
//       await unlink(imagePath1);
//       await unlink(imagePath2);
//       console.log(`Deleted files: ${imagePath1}, ${imagePath2}`);
//     } catch (error) {
//       console.error(
//         `Failed to delete files: ${imagePath1}, ${imagePath2}`,
//         error
//       );
//     }

//     // Return a success response
//     return NextResponse.json({
//       message: "Blog deleted successfully",
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
//     const id = context.params.blogID;
//     console.log(id);

//     // Find the blog by ID
//     const Find_project = await BlogModel.findById(id);
//     console.log(Find_project);

//     // Check if the blog exists
//     if (!Find_project) {
//       return NextResponse.json({ result: Find_project, status: 404 });
//     } else {
//       // Return the found blog as a JSON response
//       return NextResponse.json({ result: Find_project, status: 200 });
//     }
//   } catch (error) {
//     console.error("Error retrieving blog:", error);
//     // Return an error response
//     return NextResponse.json({ message: "Internal Server Error", status: 500 });
//   }
// }

// // PUT handler for updating a specific blog by ID
// export async function PUT(request, context) {
//   try {
//     // Connect to the database
//     await connect();

//     // Extract the blog ID from the request context
//     const id = context.params.blogID;
//     console.log(id);

//     // Parse the incoming form data
//     const data = await request.formData();

//     // Extract files from the form data
//     const file1 = data.get("displayImage");
//     const file2 = data.get("authorImage");

//     // Initialize variables for filenames and buffers
//     let filename1 = null;
//     let filename2 = null;
//     let buffer1 = null;
//     let buffer2 = null;

//     // Check if files are provided and handle them
//     if (file1 && file2) {
//       filename1 = file1.name;
//       filename2 = file2.name;

//       // Convert file data to buffers
//       const byteData1 = await file1.arrayBuffer();
//       const byteData2 = await file2.arrayBuffer();
//       buffer1 = Buffer.from(byteData1);
//       buffer2 = Buffer.from(byteData2);

//       // Define the file save paths
//       const filePath1 = `./public/uploads/${filename1}`;
//       const filePath2 = `./public/uploads/${filename2}`;

//       // Save the files to the filesystem
//       await writeFile(filePath1, buffer1);
//       await writeFile(filePath2, buffer2);
//     }

//     // Create an object to store the form data
//     const formDataObject = {};

//     // Iterate over form data entries and populate the object
//     for (const [key, value] of data.entries()) {
//       formDataObject[key] = value;
//     }

//     // Destructure the form data object
//     const { title, blogContent, datetime, author } = formDataObject;
//     console.log(title, blogContent, datetime, author);

//     // Find the blog by ID
//     const blog = await BlogModel.findById(id);

//     // Check if the blog exists
//     if (!blog) {
//       return NextResponse.json({ error: "Blog not found", status: 404 });
//     }

//     // Update the blog details
//     blog.title = title || blog.title;
//     blog.blogContent = blogContent || blog.blogContent;
//     blog.datetime = datetime || blog.datetime;
//     blog.author = author || blog.author;

//     // Update the images if new files are provided
//     if (filename1 || filename2) {
//       blog.displayImage = filename1;
//       blog.authorImage = filename2;
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
const { connect } = require("@/app/api/config/db");
const { default: BlogModel } = require("@/app/models/BlogModel");
import { unlink, writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

// DELETE handler for deleting a blog by ID
export async function DELETE(request, { params }) {
  try {
    const id = params.blogID;
    console.log(id);

    await connect();

    const Find_Project = await BlogModel.findById(id);

    if (!Find_Project) {
      return NextResponse.json({ message: "Blog not found", status: 404 });
    }

    const imagePath1 = path.join("./public/uploads/", Find_Project.displayImage);
    const imagePath2 = path.join("./public/uploads/", Find_Project.authorImage);
    console.log(imagePath1, imagePath2);

    const _deletedblog = await BlogModel.findByIdAndDelete(id);
    console.log(_deletedblog);

    if (!_deletedblog) {
      return NextResponse.json({ message: "Blog not found", status: 404 });
    }

    try {
      await unlink(imagePath1);
      await unlink(imagePath2);
      console.log(`Deleted files: ${imagePath1}, ${imagePath2}`);
    } catch (error) {
      console.error(`Failed to delete files: ${imagePath1}, ${imagePath2}`, error);
    }

    return NextResponse.json({
      message: "Blog deleted successfully",
      status: 200,
    });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json({ error: "Failed to delete blog", status: 500 });
  }
}

// GET handler for retrieving a specific blog by ID
export async function GET(request, { params }) {
  try {
    await connect();

    const id = params.blogID;
    console.log(id);

    const Find_project = await BlogModel.findById(id);
    console.log(Find_project);

    if (!Find_project) {
      return NextResponse.json({ result: Find_project, status: 404 });
    } else {
      return NextResponse.json({ result: Find_project, status: 200 });
    }
  } catch (error) {
    console.error("Error retrieving blog:", error);
    return NextResponse.json({ message: "Internal Server Error", status: 500 });
  }
}

// PUT handler for updating a specific blog by ID
export async function PUT(request, { params }) {
  try {
    await connect();

    const id = params.blogID;
    console.log(id);

    const data = await request.formData();

    const file1 = data.get("displayImage");
    const file2 = data.get("authorImage");

    let filename1 = null;
    let filename2 = null;
    let buffer1 = null;
    let buffer2 = null;

    if (file1 && file2) {
      filename1 = file1.name;
      filename2 = file2.name;

      const byteData1 = await file1.arrayBuffer();
      const byteData2 = await file2.arrayBuffer();
      buffer1 = Buffer.from(byteData1);
      buffer2 = Buffer.from(byteData2);

      const filePath1 = `./public/uploads/${filename1}`;
      const filePath2 = `./public/uploads/${filename2}`;

      await writeFile(filePath1, buffer1);
      await writeFile(filePath2, buffer2);
    }

    const formDataObject = {};
    for (const [key, value] of data.entries()) {
      formDataObject[key] = value;
    }

    const { title, blogContent, datetime, author } = formDataObject;
    console.log(title, blogContent, datetime, author);

    const blog = await BlogModel.findById(id);

    if (!blog) {
      return NextResponse.json({ error: "Blog not found", status: 404 });
    }

    blog.title = title || blog.title;
    blog.blogContent = blogContent || blog.blogContent;
    blog.datetime = datetime || blog.datetime;
    blog.author = author || blog.author;

    if (filename1 || filename2) {
      blog.displayImage = filename1;
      blog.authorImage = filename2;
    }

    await blog.save();

    return NextResponse.json({
      message: "Blog updated successfully",
      blog,
      status: 200,
    });
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json({ error: "Failed to update blog", status: 500 });
  }
}
