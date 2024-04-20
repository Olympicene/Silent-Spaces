import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from '../Layout/Layout';
import CreateAccount from "../../views/CreateAccount/CreateAccountPage";
import LandingPage from "../../views/Landing/LandingPage";
import HomePage from "../../views/Home/HomePage";
import NoPage from "../../views/Error/NoPage";
import LogIn from "../../views/Login/LogInPage";
import SpacePage from "../../views/Space/SpacePage";
import ResourcesPage from "../../views/Resources/ResourcesPage";
import CalendarPage from "../../views/Calendar/CalendarPage";
import StudyHubPage from "../../views/StudyHub/StudyHubPage";
import FavoritesPage from "../../views/Favorites/FavoritesPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="home" element={<HomePage />} />
          <Route path="spaces/:id" element={<SpacePage />} />
          <Route path="sign-up" element={<CreateAccount />} />
          <Route path="log-in" element={<LogIn/>} />
          <Route path="resources" element={<ResourcesPage/>} />
          <Route path="calendar" element={<CalendarPage/>} />
          <Route path="study-hub" element={<StudyHubPage/>} />
          <Route path="favorites" element={<FavoritesPage/>} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

