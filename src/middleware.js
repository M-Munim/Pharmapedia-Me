// import { NextResponse } from "next/server";

// export function middleware(request) {
//   // Retrieve the authentication token from cookies
//   const token = request.cookies.get('token') || null;
//   const dash = ""

//   // const token = ""
//   // If no token is found, redirect to the login page
//   if (!token) {
//     return NextResponse.redirect(new URL('/Dashboard/Login', request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     '/Dashboard/AddAdmin',
//     '/Dashboard/AddBlog',
//     '/Dashboard/AddProduct',
//     '/Dashboard/AddReview',
//     '/Dashboard/Home',
//     '/Dashboard/Logout'
//   ]
// };




// import { NextResponse } from 'next/server';

// export function middleware(request) {
//   const url = request.nextUrl.pathname;
//   const token = request.cookies.get('token') || null;

//   // Check if the user is trying to access the login page while logged in
//   if (url === '/Dashboard/Login' && token) {
//     return NextResponse.redirect(new URL('/Dashboard/Home', request.url));
//   }

//   // For authenticated routes
//   if (url.startsWith('/Dashboard') && !token) {
//     return NextResponse.redirect(new URL('/Dashboard/Login', request.url));
//   }

//   // Allow the request to continue
//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     '/Dashboard/:path*', // Apply this middleware to all routes under /Dashboard
//   ],
// };





import { NextResponse } from 'next/server';

export function middleware(request) {
  const url = request.nextUrl.pathname;
  const token = request.cookies.get('token') || null;

  // Allow access to login page if logged out
  if (url === '/Dashboard/Login' && !token) {
    return NextResponse.next();
  }

  // Redirect logged-in users away from login page
  if (url === '/Dashboard/Login' && token) {
    return NextResponse.redirect(new URL('/Dashboard/Home', request.url));
  }

  // Redirect unauthenticated users away from authenticated routes
  if (url.startsWith('/Dashboard') && !token) {
    return NextResponse.redirect(new URL('/Dashboard/Login', request.url));
  }

  // Allow the request to continue
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/Dashboard/:path*', // Apply this middleware to all routes under /Dashboard
  ],
};
