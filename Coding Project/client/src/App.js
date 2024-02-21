import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./components/LandingPage";
import Layout from './components/Layout';
import MenuPage from "./components/MenuPage";
import NoPage from './components/NoPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="menu" element={<MenuPage />} />
          <Route path="sign-up" element={<CreateAccount />} />
          <Route path="log-in" element={<NoPage />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

