import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: 'search',
  initialState: '',
  reducers: {
    searchByText(state, action) {
      const searchText = action.payload;
      return searchText;
    }
  }
})

export const { searchByText } = searchSlice.actions;
export default searchSlice.reducer;