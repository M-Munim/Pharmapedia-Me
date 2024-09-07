import { connect } from "@/app/api/config/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connect();
    const response = NextResponse.json({
      message: "Logout successful",
      success: true,
    });

    // Remove the token cookie
    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
      path: '/',
      sameSite: 'None',
      secure: true,
    });

    return response;
  } catch (error) {
    console.error(`Error during logout: ${error.message}`);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
