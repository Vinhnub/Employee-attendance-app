import React, { useState } from 'react'
import Chat from './Page/Chat'
import './App.css'
import Login from './Page/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CheckIn from './Page/CheckIn'
import ChangePassword from './Page/ChangePassword'
import WorkPage from './Page/WorkPage'
import CheckOut from './Page/CheckOut'
import OverTime from './Page/OverTime'
import Register from './Page/Register'
import UserList from './Page/UserList'
import User from './Page/User'
import UserShifts from './Page/userShifts'
import TodayShifts from './Page/TodayShifts'

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/checkin" element={<CheckIn />} />
        <Route path="/change_password" element={<ChangePassword />} />
        <Route path="/workpage" element={<WorkPage />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/overtime" element={<OverTime />} />
        <Route path="/register" element={<Register />} />
        <Route path="/userlist" element={<UserList />} />
        <Route path="/user/:id" element={<User />} />
        <Route path="/usershifts/:id" element={<UserShifts />} />
        <Route path="/today" element={<TodayShifts />} />
      </Routes>
    </BrowserRouter>
  )
}

