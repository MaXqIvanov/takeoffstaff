import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import api from '../plugins/axios/api';
import { v4 as uuidv4 } from 'uuid';
import Cookies from 'js-cookie';
import db from '../db.json';

export const getProfile = createAsyncThunk(
  'auth/getProfile',
  async (params:{(str: string): void}) => {
    // const token = uuidv4()
    // console.log(token);
    const token = Cookies.get('token')
    console.log(token);
    const response = await api.get(`/users/${token}`)
    return {response, params}
  },
)

export const userRegistration = createAsyncThunk(
    'auth/userRegistration',
    async (params:{email: string, name: string, password: string}) => {
      const response = await api(`users?email=${params.email}`)
      return {response, params}
    },
  )

const proodSlice = createSlice({
  name: 'prood',
  initialState: {
    auth: false as boolean,
    loading: false as boolean,
  },
  reducers: {
    changeAuth(state: AuthState, action: PayloadAction) { 
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProfile.pending, (state:AuthState, action:PayloadAction) => {
        state.loading = true
    });
    builder.addCase(getProfile.fulfilled, (state:AuthState,  { payload }:PayloadAction<{response:{status:number}, params: (str: string)=> void}>) => {
        state.loading = false
        if(payload.response.status === 404){
            payload.params('/auth')
        }else {
            state.auth = true
        }
        console.log(payload);
        
    });
    builder.addCase(getProfile.rejected, (state:AuthState) => {
        state.loading = false
    });

    builder.addCase(userRegistration.pending, (state:AuthState, action:PayloadAction) => {
    });
    builder.addCase(userRegistration.fulfilled, (state:AuthState,  { payload }:PayloadAction<{response:{status:number},
        params: {email: string, name: string, password: string}}>) => {
        console.log(payload.response);
        if(payload.response.status === 404){
            alert('Такая почта уже зарегистрирована в системе')
        }else {
            const token = uuidv4()
            console.log(token);
            const response = db.users.push({id: token, email: payload.params.email, name: payload.params.name, password: payload.params.password})
        }
    });
    builder.addCase(userRegistration.rejected, (state:AuthState) => {
    });
  },
});

export default proodSlice.reducer;
export const { changeAuth } =
proodSlice.actions;

interface AuthState{
auth: boolean,
loading: boolean
}