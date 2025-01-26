import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DbZoo } from "./MythicalZoo";

// ReduxJS/Toolkit sets up the redux-thunk middleware by default
// Let's start from the highest level of abstraction: RTK Query:

// You typically call createApi once for your application.

export const zooApiSlice = createApi({
  reducerPath: 'zoo',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: builder => ({
    getZoos: builder.query<DbZoo[], void>({
      query: () => '/zoos'
    })
  })
})

export const { useGetZoosQuery } = zooApiSlice;

// NEXT: Check how it's wired up in /src/store.ts
