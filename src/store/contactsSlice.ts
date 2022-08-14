import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import api from '../plugins/axios/api';

export const getAllContacts:any = createAsyncThunk(
  'contacts/getContactsAsync',
  async (params:{}) => {
    const response = await api(`users`)
    return response
  },
)

const proodSlice = createSlice({
  name: 'prood',
  initialState: {
    allContacts: [],

    loadingContacts: false,
  },
  reducers: {
    getServices(state: ContactsState, action:PayloadAction) { 
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllContacts.pending, (state:ContactsState, action:PayloadAction) => {
        state.loadingContacts = true
    });
    builder.addCase(getAllContacts.fulfilled, (state:ContactsState,  { payload }:PayloadAction<{
      data: {}
      }>) => {
        state.loadingContacts = false
        console.log(payload);
        
        state.allContacts = payload.data
    });
    builder.addCase(getAllContacts.rejected, (state:ContactsState) => {
        state.loadingContacts = false
    });
  },
});

export default proodSlice.reducer;
export const { } =
proodSlice.actions;

interface ContactsState {
    allContacts: {},
    loadingContacts: boolean,
}