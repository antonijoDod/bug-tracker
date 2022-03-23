import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { AuthProvider } from "lib/auth";

import { AuthLayout } from "components";

// Pages
import LoginPage from "pages/login/LoginPage";
import Home from "pages";
import Projects from "pages/projects/Projects";
import Bugs from "pages/bugs/Bugs";
import Bug from "pages/bugs/Bug";
import ProjectBugs from "./pages/projects/bugs/ProjectBugs";

import PrivateRoute from "utils/PrivateRoute";

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
                    <Projects />
                  </PrivateRoute>
                }
              />
              <Route
                path="/bugs"
                element={
                  <PrivateRoute>
                    <Bugs />
                  </PrivateRoute>
                }
              />
              <Route
                path="/bugs/:id"
                element={
                  <PrivateRoute>
                    <Bug />
                  </PrivateRoute>
                }
              />
              <Route
                path="/projects/:id/bugs"
                element={
                  <PrivateRoute>
                    <ProjectBugs />
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
