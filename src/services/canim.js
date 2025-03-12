import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const canimApi = createApi({
  reducerPath: "canimApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://kabadiwale-backend.onrender.com/api/v1`,
  }),
  tagTypes: ["Partner"],
  endpoints: () => ({}),
});
