import { createSlice } from "@reduxjs/toolkit";

/**
 * Defines how user's documents are stored and fetched
 */
const documentsSlice = createSlice({
  name: "documents",
  initialState: {
    value: [],
  },
  reducers: {
    setDocuments: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setDocuments } = documentsSlice.actions;
export default documentsSlice.reducer;
