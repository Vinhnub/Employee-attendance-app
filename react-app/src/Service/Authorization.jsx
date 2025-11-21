import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import * as authService from "./Auth"; 

export default function Authorization({ allow, redirect = "/unauthorized" }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await authService.me();
        if (response.data.status === "success") {
          setUser(response.data.data);
        } else {
          setUser(false);
        }
      } catch (err) {
        console.error(err);
        setUser(false);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/" replace />;

  return allow.includes(user.role)
    ? <Outlet />
    : <Navigate to={redirect} replace />;
}
