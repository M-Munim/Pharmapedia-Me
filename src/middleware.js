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


// // import { useEffect } from 'react';
// // import { useRouter } from 'next/router';

// // const useTokenRedirect = () => {
// //   const router = useRouter();

// //   useEffect(() => {
// //     // Function to check the token in localStorage
// //     const checkToken = () => {
// //       const token = localStorage.getItem('token');
// //       if (!token) {
// //         // Redirect to login page if token is missing
// //         router.push('/Dashboard/Login');
// //       }
// //     };

// //     // Check the token immediately when the component mounts
// //     checkToken();

// //     // Add event listener for localStorage changes
// //     window.addEventListener('storage', checkToken);

// //     // Clean up the event listener on component unmount
// //     return () => {
// //       window.removeEventListener('storage', checkToken);
// //     };
// //   }, [router]);
// // };

// // export default useTokenRedirect;


// // export const isAuthenticated = () => {
// //   const isVerfied = localStorage.getItem("token");
// //   return isVerfied !== null;
// // };

import { useEffect } from 'react';
import { useRouter } from 'next/router';

const useTokenRedirect = (request) => {
  const router = useRouter();

  useEffect(() => {
    const checkToken = () => {
      const token = request.localStorage.getItem('token');
      const { pathname } = router;

      if (!token && pathname.startsWith('/Dashboard')) {
        router.push('/Dashboard/Login');
      } else if (token && pathname === '/Dashboard/Login') {
        router.push('/Dashboard/Home');
      }
    };

    checkToken();

    // Optionally, you could listen for changes to localStorage
    window.addEventListener('storage', checkToken);

    return () => {
      window.removeEventListener('storage', checkToken);
    };
  }, [router]);

  return null;
};

export default useTokenRedirect;

