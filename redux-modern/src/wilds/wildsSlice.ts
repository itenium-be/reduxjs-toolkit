import { asyncThunkCreator, buildCreateSlice, createAsyncThunk, createSelector, SerializedError } from "@reduxjs/toolkit";
import { Creature, DbZoo, MythicalZoo } from "../zoo/MythicalZoo";
import { ApiResponse } from '../zoo/zoo-backend';


export const fetchWilds = createAsyncThunk(
  'wilds/Get',
  async (_, { getState, rejectWithValue }) => {
    try {
      const response = await fetch('/api/zoos');
      const data: DbZoo[] = await response.json();
      return data;
    } catch (err: any) {
      return rejectWithValue(err?.message || "Well, that failed");
    }
  },
);

export const fetchWild = createAsyncThunk(
  'wilds/GetOne',
  async (id: number, { getState, rejectWithValue }) => {
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



// For reducers: create => ({}) usage:
const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});


export const wildsSlice = createAppSlice({
  name: "wilds",
  initialState: {
    zoos: [] as DbZoo[],
    zooDetails: [] as MythicalZoo[],
    status: 'idle' as Status,
    error: null as SerializedError | null,
    creatures: [] as Creature[],
  },
  reducers: create => ({
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
          console.log('Getting creatures');
        },
        rejected: (state, action) => {
          console.log('Failed getting creatures');
        },
        fulfilled: (state, action) => {
          console.log('Creatures fetched', action.payload);
          state.creatures = action.payload ?? [];
        }
      }
    )
  }),
  extraReducers: builder => {
    builder.addCase(fetchWilds.fulfilled, (state, action) => {
      state.zoos = action.payload;
      state.status = 'succeeded';
    });
    builder.addCase(fetchWilds.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error;
    });
    builder.addCase(fetchWilds.pending, (state, action) => {
      state.status = 'pending';
    });


    builder.addCase(fetchWild.pending, (state, action) => {
      state.status = 'pending';
    });
    builder.addCase(fetchWild.fulfilled, (state, action) => {
      state.zooDetails = state.zooDetails.filter(x => x.id !== action.payload.id);
      state.zooDetails.push(action.payload);
      state.status = 'succeeded';
    });
  },
  selectors: {
    selectZoo: (state, zooId: string | number): MythicalZoo | undefined => {
      return state.zooDetails.find(x => x.id === Number(zooId));
    },

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
});

export const { getCreatures } = wildsSlice.actions;
export const { selectZoo } = wildsSlice.selectors;
export type WildsRootState = {
  wilds: ReturnType<typeof wildsSlice.getInitialState>,
}
