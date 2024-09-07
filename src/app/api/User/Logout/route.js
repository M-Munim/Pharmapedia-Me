import { connect } from "@/app/api/config/db";
import { NextResponse } from "next/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connect();
    const response = NextResponse.json({
      message: "Logout successful",
      success: true,
    });
    response.cookies.set("token", "", {
      httpOnly: true,   // Ensure the cookie is not accessible via JavaScript
      expires: new Date(0),  // Set the expiration date to a past date, which effectively deletes the cookie
      path: '/',  // Set the path to ensure the correct cookie is deleted
    });
    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
