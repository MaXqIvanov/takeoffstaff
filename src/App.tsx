import Lottie from 'lottie-react';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header';
import loadingScreen from './assets/preload.json';
import { AuthPage } from './pages/AuthPage';
import { RootState } from './store/store';
import { getProfile } from './store/authSlice';
import { useAppDispatch } from './hooks/redux';

function App() {
  const {loading} = useSelector((state:RootState)=> state.contacts)
  const { auth } = useSelector((state:RootState)=> state.auth)
  const nav = useNavigate()
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getProfile(nav))
  }, [])
  
  return (
    <>
    {!loading ? 
      <>
        {/* {userAuth ? <Header></Header> : <></> } */}
        <div className={'wrapper'}>
        <Routes>
           { auth ? 
           <Route path={'/'} element={<AuthPage />} />
           :
           <Route path={'/auth'} element={<AuthPage />} />
          } 
        </Routes>
        </div>
      </>  
      : <div className='loading'><Lottie className='spinner_app' animationData={loadingScreen} /></div>}
    </>    
  );
}
export default App;