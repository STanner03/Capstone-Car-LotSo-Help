// General Imports
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { useState } from "react";

// Pages Imports
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import VehiclePage from "./pages/VehiclePage/VehiclePage";
import MapsPage from "./pages/MapsPage/MapsPage";

// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import Modal from "./components/Modal/Modal.jsx";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  // State Variables
  const [activeVehicle, setActiveVehicle] = useState({});
  const [vehicles, setVehicles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalFormTitle, setModalFormTitle] = useState("Add");
  const [modalForm, setModalForm] = useState(null);

  // Handlers:
  const handleClose = () => setShowModal(false);

  return (
    <div>
      <div className="background">
        <Navbar
          vehicles={vehicles}
          setShowModal={setShowModal}
          setModalForm={setModalForm}
          setActiveVehicle={setActiveVehicle}
          setModalFormTitle={setModalFormTitle}
        />
        <Modal show={showModal} onClose={handleClose} title={modalFormTitle}>
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
                  activeVehicle={activeVehicle}
                />
              </PrivateRoute>
            }
          />
          <Route
            path="/vehicle/*"
            element={
              <PrivateRoute>
                <VehiclePage
                  setShowModal={setShowModal}
                  setModalForm={setModalForm}
                  activeVehicle={activeVehicle}
                  setModalFormTitle={setModalFormTitle}
                />
              </PrivateRoute>
            }
          />
          <Route
            path="/maps"
            element={
              <PrivateRoute>
                <MapsPage />
              </PrivateRoute>
            }
          />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
