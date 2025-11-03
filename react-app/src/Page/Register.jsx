import React, { useState } from "react";
import * as 

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const roleOption = [
    "employee",
    "manager"
  ]
  const loginInfo = {
    username: username,
    password: password,
    fullname: fullname,
    role: role
  }
  const handleRegister = async (e) => {
    e.preventdefault();
    try {
      const response = await 
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
        <select>
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
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}