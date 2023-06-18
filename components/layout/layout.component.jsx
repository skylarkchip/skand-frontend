import React from "react";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

function Layout({ children }) {
  return (
    <main
      className={`${inter.variable} font-primary bg-custom-light-pink min-h-screen py-8 px-4 md:p-8`}
    >
      {children}
    </main>
  );
}

export default Layout;
