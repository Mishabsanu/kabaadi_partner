import { canimApi } from "../canim";

const authApi = canimApi.injectEndpoints({
  endpoints: (builder) => ({
    // Sign Up
    signUp: builder.mutation({
      query: (body) => ({
        url: "/user/auth/signup",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Partner"],
    }),

    // Sign In
    signIn: builder.mutation({
      query: (body) => ({
        url: "/user/auth/signin",
        method: "POST",
        body,
      }),
    }),

    // Forgot Password
    forgotPassword: builder.mutation({
      query: (userInfo) => ({
        url: "/user/forgot-password",
        method: "PATCH",
        body: userInfo,
      }),
    }),

    // Persist Login
    persistLogin: builder.query({
      query: () => ({
        url: "/partner/get-auth-partner",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      providesTags: ["Partner"],
    }),

    // Add Route Plan (Fixed)
    addRoutePlan: builder.mutation({
      query: (body) => ({
        url: "/partner/add-route-plan",
        method: "POST",
        body,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      invalidatesTags: ["Partner"],
    }),
  }),
});

export const {
  useSignUpMutation,
  useSignInMutation,
  useForgotPasswordMutation,
  usePersistLoginQuery,
  useAddRoutePlanMutation,
} = authApi;
