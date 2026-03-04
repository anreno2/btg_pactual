import { Routes, Route } from "react-router";
import JoySignInSideTemplate from "./pages/sign";
import JoyOrderDashboardTemplate from "./pages/Dash";
import PrivateRoute from "./components/PrivateRoute";



export default function App() {
  return (
      <Routes>
        <Route path="/" element={<JoySignInSideTemplate />} />
        <Route
          path="/dash"
          element={
            <PrivateRoute>
              <JoyOrderDashboardTemplate />
            </PrivateRoute>
          }
        />
      </Routes>
  );
}
