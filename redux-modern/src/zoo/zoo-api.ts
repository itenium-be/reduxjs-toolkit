import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DbZoo, MythicalZoo } from "./MythicalZoo";
import { ApiResponse } from "./zoo-backend";

// ReduxJS/Toolkit sets up the redux-thunk middleware by default
// Let's start from the highest level of abstraction: RTK Query:

// You typically call createApi() once for your application.

export const zooApiSlice = createApi({
  reducerPath: 'zoo',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: builder => ({
    getZoos: builder.query<DbZoo[], void>({
      query: () => '/zoos',
    }),
    // NEXT: Check how it's wired up in /src/store.ts







    getZoo: builder.query<MythicalZoo, number>({
      query: id => `/zoos/${id}`,

      // Transform the response in case the data is not how you'd like it to be
      transformResponse: (response: ApiResponse<MythicalZoo>) => response.data,
      // Also: transformErrorResponse
    })
  })
});

export const { useGetZoosQuery, useGetZooQuery } = zooApiSlice;
