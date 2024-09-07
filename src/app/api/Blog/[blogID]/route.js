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



// // delete
// export async function DELETE(request, { params }) {
//   try {
//     // Extract the product ID from the request parameters
//     const id = params.blogID;
//     console.log(id);

//     // Connect to the database
//     await connect();

//     // Find the product by ID
//     const Find_Pro = await BlogModel.findById(id);

//     // Check if the product exists
//     if (!Find_Pro) {
//       return NextResponse.json({ message: "Product not found", status: 404 });
//     }

//     // Get the public ID for the image associated with the product
//     const publicId = Find_Pro.displayImage; // Assumes displayImage contains the public ID

//     // Delete the image from Cloudinary
//     try {
//       await cloudinary.uploader.destroy(publicId);
//       console.log(`Deleted image from Cloudinary: ${publicId}`);
//     } catch (error) {
//       console.error(`Failed to delete image from Cloudinary: ${publicId}`, error);
//     }

//     // Delete the product from the database
//     const _deletedpro = await BlogModel.findByIdAndDelete(id);

//     // Check if the product was found and deleted
//     if (!_deletedpro) {
//       return NextResponse.json({ message: "blog not found", status: 404 });
//     }

//     // Return a success response
//     return NextResponse.json({
//       message: "blog deleted successfully",
//       status: 200,
//     });
//   } catch (error) {
//     console.error("Error deleting blog:", error);
//     // Return an error response
//     return NextResponse.json({ error: "Failed to delete blog", status: 500 });
//   }
// }



// Delete a blog post
export async function DELETE(request, context) {
  try {
    const id = context.params.blogID;
    console.log("Blog ID:", id);

    // Connect to the database
    await connect();

    // Find the blog by ID
    const blog = await BlogModel.findById(id);

    if (!blog) {
      return NextResponse.json({ message: "Blog not found", status: 404 });
    }

    console.log("Blog:", blog);
    const imagePublicId = blog.displayImageId; // Ensure this matches your schema
    console.log("Image Public ID:", imagePublicId);
    const authorImageId = blog.authorImageId; // Ensure this matches your schema
    console.log("Image Public ID:", authorImageId);

    // Delete the blog from the database
    const deletedBlog = await BlogModel.findByIdAndDelete(id);

    if (!deletedBlog) {
      return NextResponse.json({
        message: "Failed to delete blog",
        status: 500,
      });
    }

    // Delete the image from Cloudinary if publicId exists
    if (imagePublicId && authorImageId) {
      try {
        const cloudinaryResponse1 = await cloudinary.v2.uploader.destroy(
          imagePublicId
        );
        const cloudinaryResponse2 = await cloudinary.v2.uploader.destroy(
          authorImageId
        );
        console.log(`Cloudinary response: ${cloudinaryResponse1.result}`);
        console.log(`Cloudinary response: ${cloudinaryResponse2.result}`);
      } catch (error) {
        console.error("Failed to delete image from Cloudinary:", error);
      }
    }

    return NextResponse.json({
      message: "Blog and associated image deleted successfully",
      status: 200,
    });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json({ error: "Failed to delete blog", status: 500 });
  }
}