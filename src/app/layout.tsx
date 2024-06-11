"use client";

import "../styles/globals.css";

import { ToastContainer } from "react-toastify";
import { ReactQueryClientProvider } from "./ReactQueryClientProvider";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import { CheckRoutersPrivate } from "./CheckRoutesPrivates";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ReactQueryClientProvider>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <AntdRegistry>
            <CheckRoutersPrivate>{children}</CheckRoutersPrivate>
          </AntdRegistry>
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
