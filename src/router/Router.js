import Cookies from "js-cookie";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Navbar from "../components/Navbar";
import JobDetail from "../pages/Job/JobDetail";
import JobsList from "../pages/Job/JobsList";
import Login from "../pages/Login";

function Router() {
  const LoginRoute = ({ children }) => {
    const location = useLocation();

    if (Cookies.get("token") === undefined) {
      return <Navigate to="/" replace state={{ from: location }} />;
    }

    return children;
  };

  const NotLoginRoute = ({ children }) => {
    const location = useLocation();

    if (Cookies.get("token") !== undefined) {
      return <Navigate to="/jobs" replace state={{ from: location }} />;
    }

    return children;
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <NotLoginRoute>
                <Login />
              </NotLoginRoute>
            }
          />

          <Route
            path="/jobs"
            element={
              <LoginRoute>
                <Navbar />
                <JobsList />
              </LoginRoute>
            }
          />

          <Route
            path="/jobs/:id"
            element={
              <LoginRoute>
                <Navbar />
                <JobDetail />
              </LoginRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Router;
