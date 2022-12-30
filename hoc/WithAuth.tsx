import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { authThunk } from "../redux/slices/AuthSlice";
import { useRouter } from "next/router";

// @ts-ignore
export const withAuth = (Component) => {
  const AuthenticatedComponent = () => {
    const router = useRouter();
    const dispath = useAppDispatch();
    const { isLoading, isAuth } = useAppSelector((state) => state.users);
    useEffect(() => {
      if (!isAuth) {
        dispath(authThunk());
      }
    }, [isAuth]);

    useEffect(() => {
      if (!isLoading && !isAuth) {
        router.push("/login");
      }
    }, [isLoading, isAuth]);

    return <Component />;
  };
  return AuthenticatedComponent;
};
