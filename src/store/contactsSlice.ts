import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getContactsAsync:any = createAsyncThunk(
  'contacts/getContactsAsync',
  async (params:any, state:any) => {
  },
)

const proodSlice = createSlice({
  name: 'prood',
  initialState: {
    contacts: [] as any [],

    loading: false as boolean,
  },
  reducers: {
    getServices(state:any, action:any) { 
    },
  },
  extraReducers: {
    [getContactsAsync.pending]: (state:any, action:any) => {

    },
    [getContactsAsync.fulfilled]: (state:any, { payload }:any) => {
    },
    [getContactsAsync.rejected]: (state:any, action: any) => {

    },
  }
});

export default proodSlice.reducer;
export const { } =
proodSlice.actions;