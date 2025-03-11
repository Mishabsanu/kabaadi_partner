"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const withGuest = (WrappedComponent) => {
  const GuestComponent = (props) => {
    const router = useRouter();

    const user = useSelector((state) => state.auth);

    useEffect(() => {
      const token = localStorage.getItem("accessToken");
      const progressStep = localStorage.getItem("progressStep");

      if (token && user?.user?.first_name) {
        router.push(`/under-review`);
      } else {
        switch (progressStep) {
          case "languageSelection":
            router.push(`/auth/enter-mobile`);
            break;
          case "enterMobile":
            router.push(`/auth/verify-otp`);
            break;
          case "otpVerified":
            router.push(`/auth/personal-details`);
            break;
          case "personalDetails":
            router.push(`/under-review`);
            break;
          default:
            router.push(`/language`);
        }
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  GuestComponent.displayName = `WithGuest(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return GuestComponent;
};

export default withGuest;
