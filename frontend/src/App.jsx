// General Imports
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { useState } from "react";

// Pages Imports
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import VehiclePage from "./pages/VehiclePage/VehiclePage";

// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  // State Variables
  const [activeVehicle, setActiveVehicle] = useState({});

  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage setActiveVehicle={setActiveVehicle} />
            </PrivateRoute>
          }
        />
        <Route
          path="/vehicle"
          element={
            <PrivateRoute>
              <VehiclePage activeVehicle={activeVehicle} />
            </PrivateRoute>
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
