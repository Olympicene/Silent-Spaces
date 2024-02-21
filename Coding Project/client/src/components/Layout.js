import './layout.css';
import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li><Link to="/">Home</Link> </li>
          <li><Link to="/menu">Menu</Link></li>
          <li><Link to="/sign-up">Sign Up</Link></li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;
