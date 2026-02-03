import React from 'react'
import { Routes , Route} from 'react-router-dom'
import LoginPage from '../features/auth/LoginPage'
import Signup from '../features/auth/SignUpPage'
import ResetPassword from '../features/auth/ForgotPassword'
import Profile from '../features/user/pages/ProfilePage'
import Home from '../features/Feed/Home'

const IndexRoute = () => {
  return (
    <Routes>
        <Route path="/login" element={<LoginPage/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/forgotPassword' element={<ResetPassword/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/' element={<Home/>} />
    </Routes>
  )
}

export default IndexRoute