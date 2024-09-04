import { connect } from "@/app/api/config/db";
import { NextResponse } from "next/server";
import User from "@/app/models/UserModel";

export async function POST(req) {
  try {
    const reqBody = await req.json();
    const { token } = reqBody;
    console.log(token);
    await connect();
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }
    console.log(user);

    user.isVerfied = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();

    return NextResponse.json({
      message: "Email verified successfully",
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
