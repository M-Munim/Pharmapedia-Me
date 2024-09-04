// const User = require("@/app/models/UserModel");
const User = require("@/app/models/UserModel").default;
import { connect } from "@/app/api/config/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connect();
    const All_Users = await User.find();
    const userCount = await User.countDocuments();
    if (!All_Users || All_Users.length === 0) {
      return NextResponse.json({ result: All_Users });
    } else {
      // return NextResponse.json({ Result: All_Users });
      return NextResponse.json({ result: All_Users, count: userCount });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ Message: "Internal Server Error " });
  }
}
