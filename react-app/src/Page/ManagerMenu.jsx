import React from "react";
import { useNavigate } from "react-router-dom";

export default function ManagerMenu() {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={()=>navigate(`today`)}>Xem ca làm</button>
      <button onClick={()=>navigate(`userlist`)}>DS nhân viên</button>
      <button onClick={()=>navigate(`logs${(new Date).toISOString().slice(0,10)}`)}>Xem log</button>
      <button onClick={()=>navigate(`register`)}>Tạo tài khoản</button>
    </div>
  );
}