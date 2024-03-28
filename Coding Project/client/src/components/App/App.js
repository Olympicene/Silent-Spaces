import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from '../Layout/Layout';
import CreateAccount from "../../views/CreateAccount/CreateAccountPage";
import LandingPage from "../../views/Landing/LandingPage";
import MenuPage from "../../views/Home/HomePage";
import NoPage from "../../views/Error/NoPage";
import LogIn from "../../views/Login/LogInPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="menu" element={<MenuPage />} />
          <Route path="sign-up" element={<CreateAccount />} />
          <Route path="log-in" element={<LogIn />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

