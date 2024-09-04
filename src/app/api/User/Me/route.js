import { getDataFromToken } from "@/app/helper/GetDataFromToken";
import { NextResponse } from "next/server";
import User from "@/app/models/UserModel";
import { connect } from "@/app/api/config/db";

export async function POST(request) {
  try {
    await connect();
    const userId = await getDataFromToken(request);
    console.log(userId);
    const user = await User.findOne({ _id: userId }).select("-password");
    const userNotFound = user ? user : "user not found";
    console.log(userNotFound);
    return NextResponse.json({
      mesaaage: "User found",
      data: user,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
