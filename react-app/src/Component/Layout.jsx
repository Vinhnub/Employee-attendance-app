import React from "react";

export default function Layout({ Navbar, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <div style={{ flex: "1", overflowY: "auto" }}>{children}</div>
      <div style={{ height: "30px", display: "flex" }}>
        <Navbar />
      </div>
    </div>
  );
}
