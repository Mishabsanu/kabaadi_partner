import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";

const withGuest = (WrappedComponent) => {
  const GuestComponent = (props) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const user = useSelector((state) => state.auth);

    useEffect(() => {
      const token = localStorage.getItem("accessToken");
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const progressStep = localStorage.getItem("progressStep");
      const queryString = searchParams.toString();
      const query = queryString ? `?${queryString}` : "";

      if (token && user?.user?.first_name) {
        router.push(`/under-review`);
      } else {
        switch (progressStep) {
          case "languageSelection":
            router.push(`/auth/enter-mobile${query}`);
            break;
          case "enterMobile":
            router.push(`/auth/verify-otp${query}`);
            break;
          case "otpVerified":
            router.push(`/auth/personal-details${query}`);
            break;
          case "personalDetails":
            router.push(`/under-review`);
            break;
          default:
            router.push(`/language`);
        }
      }
    }, []);

    return <WrappedComponent {...props} />;
  };

  GuestComponent.displayName = `WithGuest(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return GuestComponent;
};

export default withGuest;
