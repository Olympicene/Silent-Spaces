import { Outlet, NavLink } from "react-router-dom";
import styles from "./Layout.module.css"

const Layout = () => {
  return (
    <div>
      {/* <nav>
        <ul>
          <li><NavLink to="/">Home</NavLink> </li>
          <li><NavLink to="/menu">Menu</NavLink></li>
          <li><NavLink to="/sign-up">Sign Up</NavLink></li>
          <li><NavLink to="/log-in">Log In</NavLink></li>
        </ul>
      </nav> */}

      <Outlet />
    </div>
  )
};

export default Layout;
