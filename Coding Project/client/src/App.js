import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from './Layout';

import CreateAccount from "./components/CreateAccount";
import LandingPage from "./components/LandingPage";
import MenuPage from "./components/MenuPage";
import NoPage from './components/NoPage';
import LogIn from "./components/LogIn";

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

