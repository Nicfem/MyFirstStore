import React, { useEffect } from 'react';
import './App.scss';
import Layout from './components/Layout/Layout';
import Profile from './components/Profiile/Profile';
import { AuthCard } from './components/Auth/AuthCard';
import MainPage from './components/MainPage/MaingPage';
import { Route, Routes } from 'react-router-dom';
import AuthHoc from './Hoc/authHoc';
import ProductDiscription from './components/MainPage/productDescription';
import CatalogPage from './components/Catalog/CatalogPage';
import { useLazyGetUserQuery } from './Redux/User/userAPI';
import { Basket } from './components/Basket/Basket';
import { AuthPage } from './components/Auth/AuthPage';


const App = () => {
  const [checkAuth] = useLazyGetUserQuery()
  useEffect(() => {
    if(localStorage.getItem('accessToken')) {
      checkAuth()
    }
  },[])
  return (
    <>     
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<MainPage/>}/>
          <Route path='profile/*' element={<AuthHoc children={<Profile/>}/>}/>
          <Route path='auth' element={<AuthPage children={<AuthCard/>}/>}/>
          <Route path='Catalog/:type' element={<CatalogPage/>}/>
          <Route path='product/:id' element={<ProductDiscription/>}/>
          <Route path='basket' element={<Basket/>}/>
          <Route path='*' element={<p>Not found</p>}/>
        </Route>
      </Routes>   
    </>  
  );
}

export default App;
