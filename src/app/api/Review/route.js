// const { connect } = require("@/app/api/config/db");
// const { default: ReviewModel } = require("@/app/models/ReviewModel");
// const { NextResponse } = require("next/server");

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// // GET handler for retrieving all blogs
// export async function GET() {
//   try {
//     await connect();
//     const allPro = await ReviewModel.find();
//     const proCount = await ReviewModel.countDocuments();

//     if (!allPro || allPro.length === 0) {
//       return NextResponse.json({
//         result: allPro,
//         count: proCount,
//         status: 200,
//       });
//     } else {
//       return NextResponse.json({
//         result: allPro,
//         count: proCount,
//         status: 200,
//       });
//     }
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ message: "Internal Server Error", status: 500 });
//   }
// }



import { connect } from "@/app/api/config/db";
import ReviewModel from "@/app/models/ReviewModel";
import { NextResponse } from "next/server";

// GET handler for retrieving all reviews
export async function GET() {
  try {
    await connect();
    const allReviews = await ReviewModel.find();
    const reviewCount = await ReviewModel.countDocuments();

    return NextResponse.json({
      result: allReviews,
      count: reviewCount,
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json({ message: "Internal Server Error", status: 500 });
  }
}
