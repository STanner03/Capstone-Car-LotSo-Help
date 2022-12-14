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
import Modal from "./components/Modal/Modal.jsx";
import AddVehicleForm from "./components/AddVehicleForm/AddVehicleForm";


// Util Imports
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  // State Variables
  const [activeVehicle, setActiveVehicle] = useState({});
  const [vehicles, setVehicles] = useState([]);
  const [addVehicleModal, setAddVehicleModal] = useState(false);

  // Handlers:
  const handleClose = () => setAddVehicleModal(false);

  return (
    <div>
      <Navbar
        vehicles={vehicles}
        setAddVehicleModal={setAddVehicleModal}
        setActiveVehicle={setActiveVehicle}
      />
      <Modal
        show={addVehicleModal}
        onClose={handleClose}
        title={"Add a New Vehicle to Your Garage"}
      >
        <AddVehicleForm setAddVehicleModal={setAddVehicleModal} />
      </Modal>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage
                vehicles={vehicles}
                setVehicles={setVehicles}
                setActiveVehicle={setActiveVehicle}
              />
            </PrivateRoute>
          }
        />
        <Route
          path="/vehicle"
          element={
            <PrivateRoute>
              <VehiclePage
                addVehicleModal={addVehicleModal}
                setAddVehicleModal={setAddVehicleModal}
                activeVehicle={activeVehicle}
              />
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
