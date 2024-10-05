'use client';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Inter } from "next/font/google";
import "./globals.css";
import { usePathname } from "next/navigation";
import { ToastContainer } from "react-toastify";
import Script from 'next/script';  // Import Script to load Google Analytics

const inter = Inter({ subsets: ["latin"] });

const ClientWrapper = ({ children }) => {
  const currentRoute = usePathname();
  const adminDashboardRegex = /^\/Dashboard\//; // Define the regex pattern for routes starting with /AdminDashboard/
  const shouldRenderHeaderFooter = !adminDashboardRegex.test(currentRoute); // Check if the current route matches the AdminDashboard pattern

  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-GY7RKNSGB4`} // Replace with your Measurement ID
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-GY7RKNSGB4');
          `}
        </Script>

        {shouldRenderHeaderFooter && <Navbar />}
        <ToastContainer />
        {children}
        {shouldRenderHeaderFooter && <Footer />}
      </body>
    </html>
  );
};

export default ClientWrapper;
