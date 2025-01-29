Thunk Cancellation
==================

Whenever the user types in something in the auto-complete,
cancel the previous request.


```tsx
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchSuggestions = createAsyncThunk(
  "autocomplete/fetchSuggestions",
  async (query: string, { signal }) => {
    const response = await fetch(`/api/suggestions?q=${query}`, { signal });
    return await response.json();
  }
);




export const Autocomplete = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    const controller = new AbortController();

    const fetchSuggestionsAsync = async () => {
      try {
        const result = await dispatch(
          fetchSuggestions(query, { signal: controller.signal })
        ).unwrap();
        setSuggestions(result);
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("Request aborted");
        }
      }
    };

    fetchSuggestionsAsync();

    return () => {
      controller.abort(); // Cancel previous request
    };
  }, [query, dispatch]);

  return (
    <div>
      <input
        type="text"
        className="form-control"
        placeholder="Search..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      {suggestions.length > 0 && (
        <ul className="list-group mt-2">
          {suggestions.map(item => (
            <li key={item} className="list-group-item">
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};




const autocompleteSlice = createSlice({
  name: "autocomplete",
  initialState: {
    suggestions: [] as string[],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSuggestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSuggestions.fulfilled, (state, action) => {
        state.loading = false;
        state.suggestions = action.payload;
      })
      .addCase(fetchSuggestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch suggestions";
      });
  },
});
```
