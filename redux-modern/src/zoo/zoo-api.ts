import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DbZoo, MythicalZoo, Visitor } from "./MythicalZoo";
import { ApiResponse } from "./zoo-backend";

// ReduxJS/Toolkit sets up the redux-thunk middleware by default
// Let's start from the highest level of abstraction: RTK Query:

// You typically call createApi() once for your application.

export const zooApiSlice = createApi({
  reducerPath: 'zoo',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['zoos', 'zooDetails'],
  endpoints: builder => ({
    getZoos: builder.query<DbZoo[], void>({
      query: () => '/zoos',
      providesTags: ['zoos'],
    }),
    // NEXT: Check how it's wired in /src/store.ts







    getZoo: builder.query<MythicalZoo, number>({
      query: id => `/zoos/${id}`,
      providesTags: (result, error, id) => [{ type: 'zooDetails', id }],
      keepUnusedDataFor: 30, // in seconds

      // Transform the response in case the data is not how you'd like it to be
      transformResponse: (response: ApiResponse<MythicalZoo>) => response.data,
      // Also: transformErrorResponse
    }),








    addVisitor: builder.mutation<MythicalZoo, Partial<Visitor> & {zooId: number}>({
      query: ({ zooId, ...visitor }) => ({
        url: `/zoos/${zooId}`,
        method: 'POST',
        body: visitor,
      }),
      invalidatesTags: (result, error, { zooId }) => {
        // Invalidate only the cache for the current zoo details
        return [{type: 'zooDetails', id: zooId }];
      },
      async onQueryStarted({ zooId, ...visitor }, { dispatch, getState, queryFulfilled, requestId, extra, getCacheEntry }) {
        // Already show the new Visitor in the UI as if the request would succeed:
        const patchResult = dispatch(
          zooApiSlice.util.updateQueryData("getZoo", zooId, draft => {
            const tempVisitor: Visitor = {
              id: 99,
              name: visitor.name ?? "",
              type: visitor.type ?? "🧙",
              ticketType: visitor.ticketType ?? "🎫 Standard",
              favoriteCreatures: [],
            }
            draft.visitors.push(tempVisitor);
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }

        // NEXT: Migrating to RTK Query might be quite hard, maybe you want to take a step back
        // NEXT: and stick to a more low level API -- let's look at createAsyncThunk in wilds/wildsSlice.ts
      },
      async onCacheEntryAdded(arg, { dispatch, getState, extra, requestId, cacheEntryRemoved, cacheDataLoaded, getCacheEntry, }) {

      },
    }),
  })
});

export const { useGetZoosQuery, useGetZooQuery, useAddVisitorMutation } = zooApiSlice;
