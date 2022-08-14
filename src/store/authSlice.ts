import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import api from '../plugins/axios/api';
import Cookies from 'js-cookie';
import { HeadersDefaults } from 'axios';

interface CommonHeaderProperties extends HeadersDefaults {
  Authorization: string;
}

export const getProfile = createAsyncThunk(
  'auth/getProfile',
  async (params:{(str: string): void}) => {
    const token = Cookies.get('token')
    const response = await api.get(`/users?token=${token}`)
    return {response, params}
  },
)

export const userAuth = createAsyncThunk(
    'auth/userRegistration',
    async (params:{email: string, password: string, nav: {(str: string): void}}) => {
      console.log(params);
      const response = await api(`users?email=${params.email}&password=${params.password}`)
      return {response, params}
    },
  )

const authSlice = createSlice({
  name: 'prood',
  initialState: {
    user: {token: undefined, id: undefined},
    auth: false,
    loading: false,
  },
  reducers: {
    logout(state: AuthState, action: PayloadAction) { 
      state.auth = false
      state.user = {token : undefined, id: undefined}
      Cookies.remove('token');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProfile.pending, (state:AuthState, action:PayloadAction) => {
        state.loading = true
    });
    builder.addCase(getProfile.fulfilled, (state:AuthState,  { payload }:PayloadAction<{response:{data:[{token: string, id:number}] | []}, params: (str: string)=> void}>) => {
        state.loading = false
        if(payload.response.data.length == 0){
            payload.params('/auth')
        }else {
            state.auth = true
            state.user = payload.response.data[0]
        }
        console.log(payload);
        
    });
    builder.addCase(getProfile.rejected, (state:AuthState) => {
        state.loading = false
    });

    builder.addCase(userAuth.pending, (state:AuthState, action:PayloadAction) => {
    });
    builder.addCase(userAuth.fulfilled, (state:AuthState,  { payload }:PayloadAction<{response:{data:[{token: string}] | []},
        params: {email: string, password: string, nav: (str: string)=> void}}>) => {
        console.log(payload.response);
        if(payload.response.data.length == 0){
            alert('Введены не верные данные')
        }else {
          Cookies.set('token', `${payload.response.data[0].token}`, { path: '/', expires: 60 })
          api.defaults.headers = {
            Authorization: `Bearer ${payload.response.data[0].token}`
          } as CommonHeaderProperties;
          state.auth = true
          payload.params.nav('/')
        }
    });
    builder.addCase(userAuth.rejected, (state:AuthState) => {
    });
  },
});

export default authSlice.reducer;
export const { logout } = authSlice.actions;

export interface AuthState{
auth: boolean,
loading: boolean,
user: {
  token: string | undefined,
  id: number | undefined
}
}