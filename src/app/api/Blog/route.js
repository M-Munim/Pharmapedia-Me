import { connect } from '@/app/api/config/db';
import BlogModel from '@/app/models/BlogModel';
import { NextResponse } from 'next/server';
import cloudinary from 'cloudinary';

// Configure Cloudinary
cloudinary.v2.config({
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

    let displayImage = "";
    let authorImage = "";

    // Upload files to Cloudinary
    if (file1) {
      const buffer1 = Buffer.from(await file1.arrayBuffer());
      const uploadResponse1 = await new Promise((resolve, reject) => {
        cloudinary.v2.uploader.upload_stream({
          resource_type: "image",
          folder: "blogs", // Folder in Cloudinary where images will be saved
        }, (error, result) => {
          if (error) {
            reject(new Error("Error uploading displayImage: " + error.message));
          } else {
            resolve(result);
          }
        }).end(buffer1);
      });

      displayImage = uploadResponse1.secure_url; // Cloudinary URL for display image
    }

    if (file2) {
      const buffer2 = Buffer.from(await file2.arrayBuffer());
      const uploadResponse2 = await new Promise((resolve, reject) => {
        cloudinary.v2.uploader.upload_stream({
          resource_type: "image",
          folder: "authors", // Folder in Cloudinary where images will be saved
        }, (error, result) => {
          if (error) {
            reject(new Error("Error uploading authorImage: " + error.message));
          } else {
            resolve(result);
          }
        }).end(buffer2);
      });

      authorImage = uploadResponse2.secure_url; // Cloudinary URL for author image
    }

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

    return NextResponse.json({
      result: allBlogs,
      count: blogCount,
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error", status: 500 });
  }
}
