"use client";

import { useRouter as useNavigate } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/store/useAuth";
import { toast } from "react-toastify";

export const CheckRoutersPrivate = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { push } = useNavigate();
  const isAuthenticated = useAuth((state) => state.isAuthenticated);

  const checkRoutePrivates = () => {
    if (!isAuthenticated && window.location.pathname !== "/") {
      toast.error("You need to login to access this page");
      push("/");
    }
  };

  useEffect(() => checkRoutePrivates(), []);
  return children;
};
