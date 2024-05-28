import React from 'react'
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import PrivateRoute from './auth/PrivateRoute'
import AdminRoute from './auth/AdminRoute'
import Signin from './user/Signin'
import Signup from './user/Signup'
import Header from './components/Header';
import UserDashboard from './user/UserDashboard'
import AdminDashboard from './user/AdminDashboard'
import ListOfUser from './admin/ListOfUser';
import UpdateUser from './admin/UpdateUser';
import ChargeForm from './admin/ChargeForm';
import UserJurisdictionForm from './admin/UserJurisdictionForm';
const App = () => {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/signin' element={<Signin/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path="/user/dashboard" element={<PrivateRoute element={UserDashboard} />} />
      <Route path="/admin/dashboard" element={<AdminRoute element={AdminDashboard} />} />
      <Route path="/admin/list" element={<AdminRoute element={ListOfUser} />} />
      <Route path="/user/:userId/details" element={<AdminRoute element={UpdateUser} />} />
      <Route path="/create/charge" element={<AdminRoute element={ChargeForm} />} />
      <Route path="/create/jurisdiction" element={<AdminRoute element={UserJurisdictionForm} />} />
    
    

      

    </Routes>
  </BrowserRouter>
  )
}

export default App