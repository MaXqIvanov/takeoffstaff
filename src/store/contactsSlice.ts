import Cookies from "js-cookie";
import { setupStore } from './store';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import api from '../plugins/axios/api';

export const getAllContacts = createAsyncThunk(
  'contacts/getAllContacts',
  async () => {
    const response = await api(`users`)
    return response
  },
)

export const getUserContacts = createAsyncThunk(
  'contacts/getUserContacts',
  async (params:{token: string | undefined}, {getState}) => {
    console.log(params);
    let keys = Object.keys(localStorage);
    keys = keys.filter((elem:any) => elem.includes(`${Cookies.get('token')}`));
    const response = keys.map((elem:any) => JSON.parse(String(localStorage.getItem(elem))));
   return response
  },
)

export const addUserContact = createAsyncThunk(
  'contacts/addUserContact',
  async (params:{token: string | undefined, id: number | undefined}, {getState}) => {
    console.log(params);
    localStorage.setItem(`${Cookies.get('token')}/${params.id}`, JSON.stringify(params))
    return params
  },
)

export const deleteUserContact = createAsyncThunk(
  'contacts/addUserContact',
  async (params:{token: string | undefined, id: number | undefined}, {getState}) => {
    console.log(params);
    localStorage.removeItem(`${Cookies.get('token')}/${params.id}`)
    return params
  },
)

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    allContacts: [],
    userContacts: [],
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

    builder.addCase(getUserContacts.pending, (state:ContactsState, action:PayloadAction) => {
    });
    builder.addCase(getUserContacts.fulfilled, (state:ContactsState,  { payload }:PayloadAction<Array<{id :number}>>) => {
        console.log(payload);
        
        state.userContacts = payload
    });
    builder.addCase(getUserContacts.rejected, (state:ContactsState) => {
    });
    
    builder.addCase(addUserContact.pending, (state:ContactsState, action:PayloadAction) => {
    });
    builder.addCase(addUserContact.fulfilled, (state:ContactsState,  { payload }:PayloadAction<{id: number | null | undefined}>) => {
      console.log(payload);
      
        const haveUser = state.userContacts.filter((elem: {id:number | null | undefined})=> elem.id == payload.id)
        console.log(haveUser);
        if(haveUser.length === 0){
          state.userContacts = [...state.userContacts, payload]
        }else {
          alert("Данный пользователь уже есть в ваших контактах")
        }
    });
    builder.addCase(addUserContact.rejected, (state:ContactsState) => {
    });

    builder.addCase(deleteUserContact.pending, (state:ContactsState, action:PayloadAction) => {
    });
    builder.addCase(deleteUserContact.fulfilled, (state:ContactsState,  { payload }:PayloadAction<{id: number | null | undefined}>) => {
      console.log(payload);
      
        const haveUser = state.userContacts.filter((elem: {id:number | null | undefined})=> elem.id == payload.id)
        console.log(haveUser);
        if(haveUser.length === 0){
          state.userContacts = [...state.userContacts, payload]
        }else {
          alert("Данный пользователь уже есть в ваших контактах")
        }
    });
    builder.addCase(deleteUserContact.rejected, (state:ContactsState) => {
    });
  },
});

export default contactsSlice.reducer;
export const { } =
contactsSlice.actions;

interface ContactsState {
    allContacts: {},
    loadingContacts: boolean,
    userContacts: Array<{
      id: number | null | undefined
    }>
}