import React, { useState } from "react";
import * as management from "../Service/Management";
import ManagerNav from "../Component/ManagerNav";
import Layout from "../Component/Layout";
import { usePopup } from "../Component/PopUp";
import styles from "./Register.module.css";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [role, setRole] = useState("");
  const { popup } = usePopup();
  const [isLoading, setIsLoading] = useState(false);

  const roleOption = ["staff", "manager"];

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Basic validation
    if (!username.trim() || !password.trim() || !fullname.trim() || !role) {
      popup(
        <div style={{ color: "#dc3545", fontWeight: "500" }}>
          Please fill in all fields
        </div>
      );
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      popup(
        <div style={{ color: "#dc3545", fontWeight: "500" }}>
          Password must be at least 6 characters long
        </div>
      );
      setIsLoading(false);
      return;
    }

    const registerInfo = {
      username: username.trim(),
      password: password,
      fullname: fullname.trim(),
      role: role,
    };

    try {
      const response = await management.register(registerInfo);
      if (response.data.status === "success") {
        popup(
          <div style={{ color: "#28a745", fontWeight: "500" }}>
            Registration successful!
          </div>
        );
        // Reset form
        setUsername("");
        setPassword("");
        setFullname("");
        setRole("");
      } else {
        popup(
          <div style={{ color: "#dc3545", fontWeight: "500" }}>
            Registration failed: {response.data.message}
          </div>
        );
      }
    } catch (err) {
      console.error(err);
      popup(
        <div style={{ color: "#dc3545", fontWeight: "500" }}>
          Registration failed. Please try again.
        </div>
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout Navbar={ManagerNav}>
      <div className={styles.container}>
        <div className={styles.registerCard}>
          <div className={styles.header}>
            <h2 className={styles.title}>Register New User</h2>
            <p className={styles.subtitle}>Create a new account for staff or manager access</p>
          </div>

          <form className={styles.registerForm} onSubmit={handleRegister}>
            <div className={styles.formGroup}>
              <label htmlFor="fullname" className={styles.formLabel}>
                Full Name
              </label>
              <input
                id="fullname"
                type="text"
                value={fullname}
                placeholder="Enter full name"
                onChange={(e) => setFullname(e.target.value)}
                className={styles.formInput}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="username" className={styles.formLabel}>
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                placeholder="Choose a username"
                onChange={(e) => setUsername(e.target.value)}
                className={styles.formInput}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="role" className={styles.formLabel}>
                User Role
              </label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className={styles.formSelect}
                required
              >
                <option value="">Select user role</option>
                {roleOption.map((roleOption, key) => (
                  <option key={key} value={roleOption}>
                    {roleOption.charAt(0).toUpperCase() + roleOption.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.formLabel}>
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                placeholder="Enter password (min 6 characters)"
                onChange={(e) => setPassword(e.target.value)}
                className={styles.formInput}
                minLength="6"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={styles.submitButton}
            >
              {isLoading ? (
                <span className={styles.buttonContent}>
                  <svg className={styles.spinner} viewBox="0 0 24 24" width="20" height="20">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round">
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="0 12 12"
                        to="360 12 12"
                        dur="1s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  </svg>
                  Registering...
                </span>
              ) : (
                "Register User"
              )}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
