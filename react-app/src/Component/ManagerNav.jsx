import React from "react";
import Navbar from "./Navbar";

export default function ManagerNav() {
  const items = [
    { icon: "👥", label: "Users", link: "/userlist" },
    { icon: "📆", label: "Logs", link: `/logs/${new Date().toISOString().slice(0, 10)}` },
    { icon: "🖊️", label: "Register", link: "/register" },
    { icon: "📑", label: "Today", link: "/today" },
  ];
  return <Navbar components={items} />;
}
