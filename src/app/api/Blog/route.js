
// const { connect } = require("@/app/api/config/db");
// const { default: BlogModel } = require("@/app/models/BlogModel");
// const { writeFile } = require("fs/promises");
// const { NextResponse } = require("next/server");

const { connect } = require("@/app/api/config/db");
const { default: BlogModel } = require("@/app/models/BlogModel");
const { NextResponse } = require("next/server");
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
  try {
    await connect();
    const data = await request.formData();

    // Handling the uploaded files
    const file1 = data.get("displayImage");
    const file2 = data.get("authorImage");

    // Convert file data to buffer
    const buffer1 = Buffer.from(await file1.arrayBuffer());
    const buffer2 = Buffer.from(await file2.arrayBuffer());

    // Upload files to Cloudinary
    const uploadResponse1 = await cloudinary.uploader.upload_stream({
      resource_type: "image",
      folder: "blogs", // Folder in Cloudinary where images will be saved
    }, (error, result) => {
      if (error) {
        throw new Error("Error uploading displayImage: " + error.message);
      }
      return result;
    }).end(buffer1);

    const uploadResponse2 = await cloudinary.uploader.upload_stream({
      resource_type: "image",
      folder: "authors", // Folder in Cloudinary where images will be saved
    }, (error, result) => {
      if (error) {
        throw new Error("Error uploading authorImage: " + error.message);
      }
      return result;
    }).end(buffer2);

    const displayImage = uploadResponse1.secure_url; // Cloudinary URL for display image
    const authorImage = uploadResponse2.secure_url; // Cloudinary URL for author image

    // Constructing formDataObject excluding the files
    const formDataObject = {};
    for (const [key, value] of data.entries()) {
      if (key !== "displayImage" && key !== "authorImage") {
        formDataObject[key] = value;
      }
    }

    const { title, blogContent, datetime, author } = formDataObject;

    // Check if a blog with the same title already exists
    const existingBlog = await BlogModel.findOne({ title });
    if (existingBlog) {
      return NextResponse.json({
        error: "Blog already exists",
        status: 400,
      });
    }

    // Create and save the new blog entry
    const newBlog = new BlogModel({
      title,
      blogContent,
      datetime,
      author,
      displayImage, // Cloudinary URL
      authorImage, // Cloudinary URL
    });

    const savedBlog = await newBlog.save();
    if (!savedBlog) {
      return NextResponse.json({ message: "Blog not added", status: 400 });
    } else {
      return NextResponse.json({
        message: "Blog created successfully",
        success: true,
        status: 200,
      });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message, status: 500 });
  }
}


export async function GET() {
  try {
    await connect();
    const allBlogs = await BlogModel.find();
    const blogCount = await BlogModel.countDocuments();

    if (!allBlogs || allBlogs.length === 0) {
      return NextResponse.json({
        result: allBlogs,
        count: 0,
        status: 200,
      });
    } else {
      return NextResponse.json({
        result: allBlogs,
        count: blogCount,
        status: 200,
      });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error", status: 500 });
  }
}
