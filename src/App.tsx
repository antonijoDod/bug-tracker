import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { AuthProvider } from "lib/auth";

import { AuthLayout } from "components";

import Home from "pages";
import ProjectsPage from "pages/projects";
import BugsIndexPage from "pages/bugs";
import BugPage from "pages/bugs/id";
import PojectBugsPage from "pages/projects/bugs";
import ProbaIndex from "pages/proba";
import LoginPage from "pages/login/LoginPage";

import PrivateRoute from "utils/PrivateRoute";
import ProjectBugsPage from "./pages/projects/bugs/index";

import "antd/dist/antd.css";
import "styles/global.scss";

const queryClient = new QueryClient();

function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route element={<AuthLayout />}>
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Home />
                  </PrivateRoute>
                }
              />
              <Route
                path="/projects"
                element={
                  <PrivateRoute>
                    <ProjectsPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/bugs"
                element={
                  <PrivateRoute>
                    <BugsIndexPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/bugs/:id"
                element={
                  <PrivateRoute>
                    <BugPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/projects/:id/bugs"
                element={
                  <PrivateRoute>
                    <ProjectBugsPage />
                  </PrivateRoute>
                }
              />
            </Route>
          </Routes>
          <ReactQueryDevtools initialIsOpen={false} />
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
