import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const canimApi = createApi({
  reducerPath: "canimApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:2000/api/v1`,
  }),
  tagTypes: ["Partner"],
  endpoints: () => ({}),
});
