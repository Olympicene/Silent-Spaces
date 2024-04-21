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
import ScrollToTop from "../../helpers/scrollToTop";

import {
  experimental_extendTheme as materialExtendTheme,
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  THEME_ID as MATERIAL_THEME_ID,
} from '@mui/material/styles';
import { CssVarsProvider as JoyCssVarsProvider, extendTheme } from '@mui/joy/styles';

const materialTheme = materialExtendTheme();
const githubTheme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        success: {
          solidBg: '#2DA44E',
          solidHoverBg: '#2C974B',
          solidActiveBg: '#298E46',
        },
        neutral: {
          outlinedBg: '#F6F8FA',
          outlinedHoverBg: '#F3F4F6',
          outlinedActiveBg: 'rgba(238, 239, 242, 1)',
          outlinedBorder: 'rgba(27, 31, 36, 0.15)',
        },
        focusVisible: 'rgba(3, 102, 214, 0.3)',
      },
    },
  },
  focus: {
    default: {
      outlineWidth: '3px',
    },
  },
  fontFamily: {
    body: 'poppins-bold, var(--gh-fontFamily-fallback)',
  },
  components: {
    JoyButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          backgroundColor: "#2c5b3b",
          borderRadius: '6px',
          boxShadow: '0 1px 0 0 rgba(27, 31, 35, 0.04)',
          transition: '80ms cubic-bezier(0.33, 1, 0.68, 1)',
          transitionProperty: 'color,background-color,box-shadow,border-color',
          '&:hover': {
            backgroundColor: '#52a55e',
            
          },
          ...(ownerState.size === 'md' && {
            fontWeight: 600,
            minHeight: '32px',
            fontSize: '14px',
            '--Button-paddingInline': '1rem',
          }),
          ...(ownerState.color === 'success' &&
            ownerState.variant === 'solid' && {
            '--gh-palette-focusVisible': 'rgba(46, 164, 79, 0.4)',
            border: '1px solid rgba(27, 31, 36, 0.15)',
            '&:active': {
              boxShadow: 'inset 0px 1px 0px rgba(20, 70, 32, 0.2)',
            },
          }),
          ...(ownerState.color === 'neutral' &&
            ownerState.variant === 'outlined' && {
            '&:active': {
              boxShadow: 'none',
            },
          }),
        }),
      },
    },
  },
});
export default function App() {
  return (
    <MaterialCssVarsProvider theme={{ [MATERIAL_THEME_ID]: materialTheme }}>
      <JoyCssVarsProvider theme={githubTheme}>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<LandingPage />} />
              <Route path="home" element={<HomePage />} />
              <Route path="spaces/:id" element={<SpacePage />} />
              <Route path="sign-up" element={<CreateAccount />} />
              <Route path="log-in" element={<LogIn />} />
              <Route path="resources" element={<ResourcesPage />} />
              <Route path="calendar" element={<CalendarPage />} />
              <Route path="study-hub" element={<StudyHubPage />} />
              <Route path="favorites" element={<FavoritesPage />} />
              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </JoyCssVarsProvider>
    </MaterialCssVarsProvider>
  );
}

