// import { NextResponse } from 'next/server';

// export function middleware(request) {
//   const url = request.nextUrl.pathname;
//   const token = request.cookies.get('token') || null;

//   console.log(token, url);


//   // Allow access to login page if logged out
//   if (url === '/Dashboard/Login' && !token) {
//     return NextResponse.next();
//   }

//   // Redirect logged-in users away from login page
//   if (url === '/Dashboard/Login' && token) {
//     return NextResponse.redirect(new URL('/Dashboard/Home', request.url));
//   }

//   // Redirect unauthenticated users away from authenticated routes
//   if (url.startsWith('/Dashboard') && !token) {
//     return NextResponse.redirect(new URL('/Dashboard/Login', request.url));
//   }

//   // Allow the request to continue
//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     '/Dashboard/:path*',
//   ],
// };


// export const isAuthenticated = () => {
//   const isVerfied = localStorage.getItem("token");
//   return isVerfied !== null;
// };