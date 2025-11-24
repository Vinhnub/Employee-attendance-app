import React from "react";

export default function Layout({Header,Navbar, children}) {
  return (
    <div>
      <Header/>
      <Navbar/>
      {children}
    </div>
  )
}