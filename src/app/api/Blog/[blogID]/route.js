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

export async function PUT(request, { params }) {
  try {
    await connect();

    const id = params.blogID;
    console.log(id);

    const data = await request.formData();

    const file1 = data.get("displayImage");
    const file2 = data.get("authorImage");

    let imageUrl1 = null;
    let imageUrl2 = null;

    if (file1) {
      const byteData1 = await file1.arrayBuffer();
      const buffer1 = Buffer.from(byteData1);

      // Upload to Cloudinary
      const uploadResponse1 = await new Promise((resolve, reject) => {
        cloudinary.v2.uploader.upload_stream(
          { resource_type: 'auto' },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        ).end(buffer1);
      });

      imageUrl1 = uploadResponse1.secure_url;
      console.log(`Uploaded displayImage URL: ${imageUrl1}`);
    }

    if (file2) {
      const byteData2 = await file2.arrayBuffer();
      const buffer2 = Buffer.from(byteData2);

      // Upload to Cloudinary
      const uploadResponse2 = await new Promise((resolve, reject) => {
        cloudinary.v2.uploader.upload_stream(
          { resource_type: 'auto' },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        ).end(buffer2);
      });

      imageUrl2 = uploadResponse2.secure_url;
      console.log(`Uploaded authorImage URL: ${imageUrl2}`);
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

    if (imageUrl1 || imageUrl2) {
      blog.displayImage = imageUrl1;
      blog.authorImage = imageUrl2;
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


// GET handler for retrieving a specific product by ID
export async function GET(request, { params }) {
  try {
    // Connect to the database
    await connect();

    // Extract the product ID from the request parameters
    const id = params.blogID;
    console.log(id);

    // Find the product by ID
    const Find_pro = await BlogModel.findById(id);

    // Check if the product exists
    if (!Find_pro) {
      return NextResponse.json({ result: "No Blog Available", status: 404 });
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