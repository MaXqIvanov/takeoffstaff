import Lottie from 'lottie-react';
import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header';
import loadingScreen from './assets/preload.json';
import { AuthPage } from './pages/AuthPage';

function App() {
  const {loading} = useSelector((state:any)=> state.contacts)
  return (
    <>
    {loading ? 
      <>
        {/* {userAuth ? <Header></Header> : <></> } */}
        <div className={'wrapper'}>
        <Routes>
            <Route path={'/'} element={<AuthPage />} />
            <Route path={'/auth'} element={<AuthPage />} />
        </Routes>
        </div>
      </>  
      : <div className='loading'><Lottie className='spinner_app' animationData={loadingScreen} /></div>}
    </>    
  );
}

export default App;
