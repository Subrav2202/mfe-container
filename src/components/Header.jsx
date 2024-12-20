import React from "react";
import { NavLink } from "react-router-dom";
export function Header() {
  return (
    <header className="App-header">
      <h1>Organization Portal</h1>
      <nav>
        <NavLink to="/" end>
          Home
        </NavLink>
        |
        <NavLink to="/about" end>
          About
        </NavLink>
        |
        <NavLink to="/contact" end>
          Contact
        </NavLink>
        |
        <NavLink to="/employee" end>
          Employee
        </NavLink>
        |
        <NavLink to="/employer" end>
          Employer
        </NavLink>
      </nav>
    </header>
  );
}

