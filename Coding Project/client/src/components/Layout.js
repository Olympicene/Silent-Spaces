import './layout.css';
import { Outlet, Link, NavLink } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li><NavLink to="/">Home</NavLink> </li>
          <li><NavLink to="/menu">Menu</NavLink></li>
          <li><NavLink to="/sign-up">Sign Up</NavLink></li>
          <li><NavLink to="/log-in">Log In</NavLink></li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;
