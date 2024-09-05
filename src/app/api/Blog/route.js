
const { connect } = require("@/app/api/config/db");
const { default: BlogModel } = require("@/app/models/BlogModel");
const { writeFile } = require("fs/promises");
const { NextResponse } = require("next/server");

export async function POST(request) {
  try {
    await connect();
    const data = await request.formData();

    // Handling the uploaded files
    const file1 = data.get("displayImage");
    const file2 = data.get("authorImage");
    const displayImage = file1.name;
    const authorImage = file2.name;

    console.log(displayImage);
    console.log(authorImage);

    // Convert file data to buffer
    const buffer1 = Buffer.from(await file1.arrayBuffer());
    const buffer2 = Buffer.from(await file2.arrayBuffer());

    console.log(buffer1);
    console.log(buffer2);

    // File save paths
    const filePath1 = `./public/uploads/${displayImage}`;
    const filePath2 = `./public/uploads/${authorImage}`;

    // Save the files
    await writeFile(filePath1, buffer1);
    await writeFile(filePath2, buffer2);

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
      displayImage,
      authorImage,
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
