import React from "react";
import Navbar from "./Navbar";

export default function ManagerNav() {
  const items = [
    { icon: "👥", link: "/userlist" },
    { icon: "📆", link: `/logs/${new Date().toISOString().slice(0, 10)}` },
    { icon: "🖊️", link: "/register" },
    { icon: "📑", link: "/today" },
  ];
  return <Navbar components={items} />;
}
