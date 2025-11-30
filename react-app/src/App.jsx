import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Authorization from "./Service/Authorization";
import { ThemeProvider } from "./Component/ThemeContext";
import User from "./Page/User";
import Login from "./Page/Login";
import CheckIn from "./Page/CheckIn";
import WorkPage from "./Page/WorkPage";
import CheckOut from "./Page/CheckOut";
import OverTime from "./Page/OverTime";
import Register from "./Page/Register";
import UserList from "./Page/UserList";
import LogsPage from "./Page/LogsPage";
import UserLogs from "./Page/UserLogs";
import UserShifts from "./Page/UserShifts";
import TodayShifts from "./Page/TodayShifts";
import ChangePassword from "./Page/ChangePassword";
import Unauthorized from "./Page/Unauthorized";
import { PopupProvider } from "./Component/PopUp";

export default function App() {
  return (
    <ThemeProvider>
      <PopupProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route element={<Authorization allow={["manager"]} />}>
              <Route path="/user/:id" element={<User />} />
              <Route path="/register" element={<Register />} />
              <Route path="/userlist" element={<UserList />} />
              <Route path="/today" element={<TodayShifts />} />
              <Route path="/logs/:date" element={<LogsPage />} />
              <Route path="/user/:id/Logs" element={<UserLogs />} />
              <Route path="/user/:id/shifts" element={<UserShifts />} />
            </Route>
            <Route element={<Authorization allow={["staff"]} />}>
              <Route path="/workpage" element={<WorkPage />} />
              <Route path="/checkin" element={<CheckIn />} />
              <Route path="/checkout" element={<CheckOut />} />
              <Route path="/overtime" element={<OverTime />} />
              <Route path="/change_password" element={<ChangePassword />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </PopupProvider>
    </ThemeProvider>
  );
}

//npm install
//npm audit fix
