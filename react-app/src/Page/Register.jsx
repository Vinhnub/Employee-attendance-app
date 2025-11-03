import React, { useState } from "react";
import * as management from "../Service/Management";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [role, setRole] = useState("");
  const roleOption = [
    "employee",
    "manager"
  ]
  const registerInfo = {
    username: username,
    password: password,
    fullname: fullname,
    role: role
  }
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await management.register(registerInfo);
      if (response.data.stuats=="success") {
        alert("register successfully");
      }
      else {
        alert("register failed");
      }
    } catch (err) {
      alert("register failed");
      console.error(err);
    }
  }
  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          value={fullname}
          placeholder="Full name"
          onChange={(e) => setFullname(e.target.value)} />
        <br/>
        <input
          type="text"
          value={username}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)} />
        <br/>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="">Select role</option>
          {roleOption.map((role,key) => (
            <option key={key} value={role}>{role}</option>
          ))}
        </select>
        <br/>
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)} />
        <br/>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
