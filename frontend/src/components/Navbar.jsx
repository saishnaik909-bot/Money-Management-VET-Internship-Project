import { NavLink } from "react-router-dom";
import { Logo } from "./Illustrations";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="brand"><Logo /> <span>SMM</span></div>
        <div className="nav-links">
          <NavLink to="/" end>Dashboard</NavLink>
          <NavLink to="/logbook">Log Book</NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
