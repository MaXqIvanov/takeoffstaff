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
    let keys = Object.keys(localStorage);
    keys = keys.filter((elem:any) => elem.includes(`${Cookies.get('token')}`));
    const response = keys.map((elem:any) => JSON.parse(String(localStorage.getItem(elem))));
   return response
  },
)

export const addUserContact = createAsyncThunk(
  'contacts/addUserContact',
  async (params:{token: string | undefined, id: number | undefined, username: string}, {getState}) => {
    localStorage.setItem(`${Cookies.get('token')}/${params.id}`, JSON.stringify(params))
    return params
  },
)

export const deleteUserContact = createAsyncThunk(
  'contacts/deleteUserContact',
  async (params:{token: string | undefined, id: number | undefined}, {getState}) => {
    localStorage.removeItem(`${Cookies.get('token')}/${params.id}`)
    return params
  },
)

export const changeUserContact = createAsyncThunk(
  'contacts/changeUserContact',
  async (params:{id: number | undefined, username: string, name: string}, {getState}) => {
    localStorage.setItem(`${Cookies.get('token')}/${params.id}`, JSON.stringify({
      ...params,
      username: params.name
    }))
    return params
  },
)

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    allContacts: [],
    userContacts: [],
    loadingContacts: false,
    searchContacts: [],
    // modal window
    isChange: false
  },
  reducers: {
    setIsChange(state: ContactsState, action:PayloadAction) { 
      state.isChange = !state.isChange
    },
    searchingContacts(state: ContactsState, action:PayloadAction<string>) {
      state.searchContacts = state.allContacts.filter((elem:{username: string})=> elem.username.includes(action.payload))
    }
  }, 
  extraReducers: (builder) => {
    builder.addCase(getAllContacts.pending, (state:ContactsState, action:PayloadAction) => {
        state.loadingContacts = true
    });
    builder.addCase(getAllContacts.fulfilled, (state:ContactsState,  { payload }:PayloadAction<{
      data: []
      }>) => {
        state.loadingContacts = false
        state.allContacts = payload.data
        state.searchContacts = payload.data
    });
    builder.addCase(getAllContacts.rejected, (state:ContactsState) => {
        state.loadingContacts = false
    });

    builder.addCase(getUserContacts.pending, (state:ContactsState, action:PayloadAction) => {
    });
    builder.addCase(getUserContacts.fulfilled, (state:ContactsState,  { payload }:PayloadAction<Array<{id :number, username: string}>>) => {
        state.userContacts = payload
    });
    builder.addCase(getUserContacts.rejected, (state:ContactsState) => {
    });
    
    builder.addCase(addUserContact.pending, (state:ContactsState, action:PayloadAction) => {
    });
    builder.addCase(addUserContact.fulfilled, (state:ContactsState,  { payload }:PayloadAction<{id: number | null | undefined, username: string| null | undefined}>) => {
      
        const haveUser = state.userContacts.filter((elem: {id:number | null | undefined})=> elem.id == payload.id)
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
      state.userContacts = state.userContacts.filter((elem: {id:number | null | undefined})=> elem.id !== payload.id)

    });
    builder.addCase(deleteUserContact.rejected, (state:ContactsState) => {
    });

    builder.addCase(changeUserContact.pending, (state:ContactsState, action:PayloadAction) => {
    });
    builder.addCase(changeUserContact.fulfilled, (state:ContactsState,  { payload }:PayloadAction<{id: number | null | undefined, name: string}>) => {
      for(let i = 0; i < state.userContacts.length; i++){
        if(state.userContacts[i].id === payload.id){
          state.userContacts[i] = {...payload, 'username': payload.name}
          state.isChange = false
        }
      }

    });
    builder.addCase(changeUserContact.rejected, (state:ContactsState) => {
    });
  },
});

export default contactsSlice.reducer;
export const { setIsChange, searchingContacts } =
contactsSlice.actions;

interface ContactsState {
    allContacts: Array<{
      username: string
    }>,
    searchContacts: Array<{}>,
    loadingContacts: boolean,
    userContacts: Array<{
      id: number | null | undefined
      username: string | null | undefined,
    }>,
    isChange: boolean
}