import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar({ components }) {
  const navigate = useNavigate();
  return (
    <>
      {components.map((component, key) => (
        <button
          key={key}
          onClick={() => navigate(`../${component.link}`)}
          style={{ border: "0", flex: "1", height: "100%" }}
        >
          {component.icon}
        </button>
      ))}
    </>
  );
}
