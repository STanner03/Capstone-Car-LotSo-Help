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
import AddVehicleForm from "./components/forms/AddVehicleForm/AddVehicleForm";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  // State Variables
  const [activeVehicle, setActiveVehicle] = useState({});
  const [vehicles, setVehicles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [vehicleFormFunction, setVehicleFormFunction] = useState("Add");
  const [modalForm, setModalForm] = useState(null);

  // Handlers:
  const handleClose = () => setShowModal(false);

  return (
    <div>
      <Navbar
        vehicles={vehicles}
        setShowModal={setShowModal}
        setModalForm={setModalForm}
        setActiveVehicle={setActiveVehicle}
      />
      <Modal
        show={showModal}
        onClose={handleClose}
        title={`${vehicleFormFunction} a Vehicle in Your Garage`}
      >
        {modalForm}
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
                setShowModal={setShowModal}
                setModalForm={setModalForm}
                activeVehicle={activeVehicle}
                setVehicleFormFunction={setVehicleFormFunction}
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
