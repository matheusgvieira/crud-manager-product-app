"use client";
import "../styles/globals.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ReactQueryClientProvider } from "./ReactQueryClientProvider";
import { useRouter as useNavigate } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/store/useAuth";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { push } = useNavigate();
  const isAuthenticated = useAuth((state) => state.isAuthenticated);

  const checkRoutePrivates = () => {
    if (!isAuthenticated && window.location.pathname !== "/") {
      toast.error("You need to login to access this page");
      push("/");
    }
  };

  useEffect(() => checkRoutePrivates(), []);

  return (
    <html lang="en">
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
        <body suppressHydrationWarning={true}>{children}</body>
      </ReactQueryClientProvider>
    </html>
  );
}
