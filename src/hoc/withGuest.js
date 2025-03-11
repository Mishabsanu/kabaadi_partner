import { useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";

const withGuest = (WrappedComponent) => {
  const GuestComponent = (props) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const user = useSelector((state) => state.auth);

    // Memoize queryString to prevent unnecessary recalculations
    const queryString = useMemo(() => {
      const query = searchParams.toString();
      return query ? `?${query}` : "";
    }, [searchParams]);

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
            router.push(`/auth/verify-otp${queryString}`);
            break;
          case "otpVerified":
            router.push(`/auth/personal-details${queryString}`);
            break;
          case "personalDetails":
            router.push(`/under-review`);
            break;
          default:
            router.push(`/language`);
        }
      }
    }, [router, queryString]);

    return <WrappedComponent {...props} />;
  };

  GuestComponent.displayName = `WithGuest(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return GuestComponent;
};

export default withGuest;
