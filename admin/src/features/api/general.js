// Or from '@reduxjs/toolkit/query/react'
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { base_url } from "../../app/axiosConfig";

export const generalApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: base_url,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.userToken;

      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (build) => ({
    getData: build.query({
      query: (url) => ({ url }),
    }),
    addData: build.mutation({
      query: ({ url, body }) => ({ url, method: "POST", body }),
    }),
    editData: build.mutation({
      query: ({ url, body, id }) => ({
        url: `${url}/${id}`,
        method: "PUT",
        body,
      }),
    }),
    removeData: build.mutation({
      query: ({ url, id }) => ({ url: `${url}/${id}`, method: "DELETE" }),
    }),
  }),
});

export const {
  useGetDataQuery,
  useAddDataMutation,
  useEditDataMutation,
  useRemoveDataMutation,
} = generalApi;
