import { AsyncThunk, asyncThunkCreator, buildCreateSlice, createAsyncThunk, createSelector, SerializedError } from "@reduxjs/toolkit";
import { Creature, DbZoo, MythicalZoo, Visitor } from "../zoo/MythicalZoo";
import { ApiResponse } from '../zoo/zoo-backend';
import { createAppAsyncThunk } from "./thunk-types";


export const fetchWilds = createAsyncThunk(
  'wilds/Get', // actions: pending, fulfilled/rejected
  async (_, thunkApi) => {
    // thunkApi:
    // rejectWithValue / fulfillWithValue
    // getState & dispatch
    // extra: extra stuff from thunk middleware
    // requestId: unique id
    // signal: abort when no longer interested in the result
    try {
      const rootState = thunkApi.getState(); // eslint-disable-line

      const response = await fetch('/api/zoos');
      const data: DbZoo[] = await response.json();
      return data;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err?.message || "Well, that failed");
    }
  },
);


export const fetchWild = createAppAsyncThunk(
  'wilds/GetOne',
  async (id: number, { getState, rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(`/api/zoos/${id}`);
      const data: ApiResponse<MythicalZoo> = await response.json();
      return data.data;
    } catch (err: any) {
      return rejectWithValue(err?.message || "Well, that failed");
    }
  },
);

type Status = 'idle' | 'pending' | 'succeeded' | 'failed';



// For reducers: create.asyncThunk usage:
const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});


export const wildsSlice = createAppSlice({
  name: "wilds",
  initialState: {
    zoos: [] as DbZoo[],
    zooDetails: [] as MythicalZoo[],
    status: "idle" as Status,
    error: null as SerializedError | null,
    creatures: [] as Creature[],
  },

  // reducers (sync actions) vs extraReducers (our thunks)
  extraReducers: builder => {
    builder.addCase(fetchWilds.pending, (state, action) => {
      state.status = 'pending';
    });
    builder.addCase(fetchWilds.fulfilled, (state, action) => {
      state.zoos = action.payload;
      state.status = 'succeeded';
    });
    builder.addCase(fetchWilds.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error;
    });


    builder.addCase(fetchWild.pending, (state, action) => {
      state.status = 'pending';
    });
    builder.addCase(fetchWild.fulfilled, (state, action) => {
      state.zooDetails = state.zooDetails.filter(x => x.id !== action.payload.id);
      state.zooDetails.push(action.payload);
      state.status = 'succeeded';
    });

    // builder.addMatcher(
    //   (action): action is RejectedAction => action.type.endsWith('/rejected'),
    //   (state, action) => {
    //     state.status = 'failed';
    //   }
    // )
    // builder.addDefaultCase((state, action) => {})
  },

  selectors: {
    selectZoo: (state, zooId: string | number): MythicalZoo | undefined => {
      return state.zooDetails.find(x => x.id === Number(zooId));
    },

    // NEXT: WildsList.tsx for dispatching our thunks & selecting the data














    // Not type safe 😢
    selectPreviousAndNextZoo: createSelector(
      [state => state.zoos, (_, zooId: number) => zooId],
      (zoos: DbZoo[], zooId) => {
        return {
          prevZoo: zoos.find(zoo => zoo.id === zooId - 1),
          nextZoo: zoos.find(zoo => zoo.id === zooId + 1),
        };
      }
    ),
  },


  // Alternative reducers syntax:
  reducers: create => ({
    deleteVisitor: create.reducer<{zooId: number, visitorId: number}>((state, action) => {
      const wild = state.zooDetails.find(x => x.id === action.payload.zooId);
      if (wild) {
        wild.visitors = wild.visitors.filter(x => x.id !== action.payload.visitorId);
      }
    }),

    // A PreparedReducer where we modify the action first
    addVisitor: create.preparedReducer(
      (visitor: Omit<Partial<Visitor>, "id"> & {zooId: number}) => {
        return {
          payload: {
            id: 99,
            favoriteCreatures: [],
            name: "",
            type: "🧙" as const,
            ticketType:  "🎫 Standard" as const,
            ...visitor,
          }
        }
      },
      (state, action) => {
        const {zooId, ...visitor} = action.payload;
        const wild = state.zooDetails.find(x => x.id === zooId);
        wild?.visitors.push(visitor);
      }
    ),
    // Prepared Reducers are also possible without the create builder:
    // --> See moreSlice for addPartialUser example

    // See above, requires buildCreateSlice()
    getCreatures: create.asyncThunk(
      async (_, thunkApi): Promise<Creature[]> => {
        const state = thunkApi.getState() as WildsRootState;
        if (!state.wilds.creatures.length) {
          const res = await fetch('/api/creatures');
          const data = await res.json() as Creature[];
          return data;
        }
        return state.wilds.creatures;
      }, {
        pending: state => {
          // console.log('Getting creatures');
        },
        rejected: (state, action) => {
          console.log('Failed getting creatures');
        },
        fulfilled: (state, action) => {
          // console.log('Creatures fetched', action.payload);
          state.creatures = action.payload ?? [];
        }
      }
    )
  }),

  // NEXT: The End? More? see /more/*.md 😀
});






export const { getCreatures, addVisitor, deleteVisitor } = wildsSlice.actions;
export const { selectZoo } = wildsSlice.selectors;
export type WildsRootState = {
  wilds: ReturnType<typeof wildsSlice.getInitialState>,
}

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>; // eslint-disable-line
