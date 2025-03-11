"use client";
import { setLogin } from "@/redux/auth/authSlice";
import { usePersistLoginQuery } from "@/services/auth/authApi";
import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";

const Auth = ({ children }) => {
  const dispatch = useDispatch();

  const { data: userData, error: userError } = usePersistLoginQuery();

  const user = useMemo(() => userData?.result || {}, [userData]);
  useEffect(() => {
    if (userData && !userError) {
      dispatch(
        setLogin({ user: userData?.result, token: userData?.result?.token })
      );
    }
    if (userError?.data) {
    }
  }, [userData, userError, dispatch, user]);

  return <>{children}</>;
};

export default Auth;
