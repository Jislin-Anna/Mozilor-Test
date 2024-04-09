import { Navigate, Route, Routes } from 'react-router-dom'
import Login from "../pages/login/login";

import Dashboard from '../pages/dashboard/dashboard'


const AppRoutes = () => {    
  return (
    <Routes>
        <Route path='/' element={<Navigate to="/login" />}></Route>
        <Route path='/dashboard' element={<Dashboard />}></Route>
        <Route path="*" element={<Login />} />
  </Routes>
  )
}

export default AppRoutes;