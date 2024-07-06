"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import "./styles/Bootstrap.css";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { metadata } from "./metadata";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <Provider store={store}>
      <html lang="en">
        {/* <head>
          <title>{metadata.title}</title>
          <meta name="description" content={metadata.description} />
        </head> */}
        <body className={inter.className}>{children}</body>
      </html>
    </Provider>
  );
}
