import React from "react";
import Navbar from "./Navbar";

export default function UserNav() {
  const items = [
    { icon: "✅", link: "/checkin" },
    { icon: "🚪", link: "/checkout" },
    { icon: "⌛", link: "/overtime" },
    { icon: "💼", link: "/workpage" },
    { icon: "📅", link: "/today" },
    { icon: "🔐", link: "/change_password" },
  ];
  return <Navbar components={items} />;
}
