import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export const getContactsAsync:any = createAsyncThunk(
  'contacts/getContactsAsync',
  async (params:{}) => {
  },
)

const proodSlice = createSlice({
  name: 'prood',
  initialState: {
    contacts: [],

    loading: false,
  },
  reducers: {
    getServices(state: ContactsState, action:PayloadAction) { 
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getContactsAsync.pending, (state:ContactsState, action:PayloadAction) => {
        state.loading = true
    });
    builder.addCase(getContactsAsync.fulfilled, (state:ContactsState,  { payload }:PayloadAction) => {
        state.loading = false
    });
    builder.addCase(getContactsAsync.rejected, (state:ContactsState) => {
        state.loading = false
    });
  },
});

export default proodSlice.reducer;
export const { } =
proodSlice.actions;

interface ContactsState {
    contacts: {
        id: number
    }[],
    loading: boolean,
}