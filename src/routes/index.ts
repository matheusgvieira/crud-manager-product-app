import { useAuth } from "@/store/useAuth";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export const rourtesPrivilegies = {
  public: [
    {
      path: "/",
      component: "products-list",
      exact: true,
    },
  ],
  private: [
    {
      path: "/add-product",
      component: "add-product",
      exact: true,
    },
    {
      path: "/edit-product/:id",
      component: "edit-product",
      exact: true,
    },
  ],
};

export interface IUseRoutes {
  pushRoute: (path: string) => void;
}

export const usePushRoute = (): IUseRoutes => {
  const { push } = useRouter();
  const isAuthenticated = useAuth((state) => state.isAuthenticated);

  const pushRoute = (path: string) => {
    const isPrivateRoute = rourtesPrivilegies.private.some(
      (route) => route.path === path
    );

    if (isPrivateRoute && !isAuthenticated) {
      toast.error("You need to login to access this page");
      return;
    }

    push(path);
  };

  return { pushRoute };
};
