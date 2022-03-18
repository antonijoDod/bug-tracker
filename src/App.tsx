import "antd/dist/antd.css";
import "styles/global.scss";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import Home from "pages";
import ProjectsPage from "pages/projects";
import BugsIndexPage from "pages/bugs";
import BugPage from "pages/bugs/id";
import PojectBugsPage from "pages/projects/bugs";
import LoginPage from "pages/login";

import { AdminLayout } from "components";
import PrivateRoute from "utils/privateRoute";
import ProjectBugsPage from "./pages/projects/bugs/index";

const queryClient = new QueryClient();

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<AdminLayout />}>
            <Route index element={<Home />} />
            <Route
              path="/projects"
              element={
                <PrivateRoute>
                  <ProjectsPage />
                </PrivateRoute>
              }
            />
            <Route path="/bugs" element={<BugsIndexPage />} />
            <Route path="/bugs/:id" element={<BugPage />} />
            <Route path="/projects/:id/bugs" element={<ProjectBugsPage />} />
          </Route>
        </Routes>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
