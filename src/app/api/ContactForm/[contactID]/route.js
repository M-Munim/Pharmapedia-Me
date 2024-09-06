// Import required modules
const { connect } = require("@/app/api/config/db"); // Import the database connection function
const { default: ContectForm } = require("@/app/models/ContectForm"); // Import the ContectForm schema
import { NextResponse } from "next/server"; // Import NextResponse for sending responses

// DELETE handler for deleting a contact form entry by ID
export async function DELETE(request, { params }) {
  try {
    // Extract the contact ID from the request context
    const id = params.contactID;
    console.log(id);

    // Connect to the database
    await connect();

    // Find the contact form entry by ID
    const Find_Pro = await ContectForm.findById(id);

    // Check if the contact form entry exists
    if (!Find_Pro) {
      return NextResponse.json({ message: "Message not found", status: 404 });
    }

    // Delete the contact form entry from the database
    const _deletedpro = await ContectForm.findByIdAndDelete(id);
    console.log(_deletedpro);

    // Check if the contact form entry was deleted
    if (!_deletedpro) {
      return NextResponse.json({ message: "Message not found", status: 404 });
    }

    // Return a success response
    return NextResponse.json({
      message: "Message deleted successfully",
      status: 200,
    });
  } catch (error) {
    console.error("Error deleting message:", error);
    // Return an error response
    return NextResponse.json({ error: "Failed to delete message", status: 500 });
  }
}

// GET handler for retrieving a specific contact form entry by ID
export async function GET(request, { params }) {
  try {
    // Connect to the database
    await connect();

    // Extract the contact ID from the request context
    const id = params.contactID;
    console.log(id);

    // Find the contact form entry by ID
    const Find_pro = await ContectForm.findById(id);

    // Check if the contact form entry exists
    if (!Find_pro) {
      return NextResponse.json({ result: "No contact form entry found", status: 404 });
    } else {
      // Return the found contact form entry as a JSON response
      return NextResponse.json({ result: Find_pro, status: 200 });
    }
  } catch (error) {
    console.error("Error retrieving message:", error);
    // Return an error response
    return NextResponse.json({ message: "Internal Server Error", status: 500 });
  }
}
