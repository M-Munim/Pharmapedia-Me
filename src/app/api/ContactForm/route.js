// const { connect } = require("@/app/api/config/db");
// const { default: ContectForm } = require("@/app/models/ContectForm");
// const { NextResponse } = require("next/server");

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// // POST handler for creating a product
// export async function POST(request) {
//   try {
//     await connect();

//     const data = await request.json();
//     console.log(data)


//     const { firstName, lastName, email, message, phone } = data;
//     console.log(firstName, lastName, email, message, phone);


//     const existingProduct = await ContectForm.findOne({ email });
//     if (existingProduct) {
//       return NextResponse.json({
//         error: 'contact already exists',
//         status: 400,
//       });
//     }

//     const newProduct = new ContectForm({
//       firstName, lastName, email, message, phone
//     });

//     console.log(newProduct);

//     const savedProduct = await newProduct.save();
//     if (!savedProduct) {
//       return NextResponse.json({ message: 'COntact not added', status: 400 });
//     } else {
//       return NextResponse.json({
//         message: 'Contact created successfully',
//         success: true,
//         status: 200,
//       });
//     }
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: error.message, status: 500 });
//   }
// }

// // GET handler for retrieving all products
// export async function GET() {
//   try {
//     await connect();
//     const allPro = await ContectForm.find();
//     const proCount = await ContectForm.countDocuments();

//     return NextResponse.json({
//       result: allPro,
//       count: proCount,
//       status: 200,
//     });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ message: "Internal Server Error", status: 500 });
//   }
// }



// Import required modules
const { connect } = require("@/app/api/config/db"); // Import the database connection function
const { default: ContectForm } = require("@/app/models/ContectForm"); // Import the ContectForm schema
import { NextResponse } from "next/server"; // Import NextResponse for sending responses

// POST handler for creating a contact form entry
export async function POST(request) {
  try {
    await connect();

    // Parse the incoming JSON data
    const data = await request.json();
    console.log(data);

    const { firstName, lastName, email, message, phone } = data;
    console.log(firstName, lastName, email, message, phone);

    // Check if a contact with the same email already exists
    const existingContact = await ContectForm.findOne({ email });
    if (existingContact) {
      return NextResponse.json({
        error: 'Contact already exists',
        status: 400,
      });
    }

    // Create a new contact form entry
    const newContact = new ContectForm({
      firstName, lastName, email, message, phone
    });

    console.log(newContact);

    // Save the new contact form entry to the database
    const savedContact = await newContact.save();
    if (!savedContact) {
      return NextResponse.json({ message: 'Contact not added', status: 400 });
    } else {
      return NextResponse.json({
        message: 'Contact created successfully',
        success: true,
        status: 200,
      });
    }
  } catch (error) {
    console.error("Error creating contact:", error);
    return NextResponse.json({ error: error.message, status: 500 });
  }
}

// GET handler for retrieving all contact form entries
export async function GET() {
  try {
    await connect();

    // Retrieve all contact form entries and count them
    const allContacts = await ContectForm.find();
    const contactCount = await ContectForm.countDocuments();

    return NextResponse.json({
      result: allContacts,
      count: contactCount,
      status: 200,
    });
  } catch (error) {
    console.error("Error retrieving contacts:", error);
    return NextResponse.json({ message: "Internal Server Error", status: 500 });
  }
}
