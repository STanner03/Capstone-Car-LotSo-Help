// General Imports:
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

// Component Imports:
import EditVehicleForm from "../../components/forms/VehicleForms/EditVehicleForm/EditVehicleForm";
import DeleteConfirmationForm from "../../components/forms/VehicleForms/DeleteConfirmationForm/DeleteConfirmationForm";

// Util Imports:
import useAuth from "../../hooks/useAuth";
import PrivateRoute from "../../utils/PrivateRoute";

const VehiclePage = ({
  setShowModal,
  setModalForm,
  activeVehicle,
  setModalFormTitle,
}) => {
  // State Variables
  const [user, token] = useAuth();
  const [vehicleFillups, setVehicleFillups] = useState([]);
  const [vehicleMaintenance, setVehicleMaintenance] = useState([]);

  // UseEffects:
  useEffect(() => {
    const fetchVehicleFillups = async () => {
      try {
        let response = await axios.get(
          `http://127.0.0.1:8000/api/vehicle/${activeVehicle.id}/fillup/all/`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setVehicleFillups(response.data);
      } catch (error) {
        console.log("fetchVehicleFillups Failed", error.response);
      }
    };
    fetchVehicleFillups();
  }, [activeVehicle]);

  useEffect(() => {
    const fetchVehicleMaintenance = async () => {
      try {
        let response = await axios.get(
          `http://127.0.0.1:8000/api/vehicle/${activeVehicle.id}/maintenance/all/`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setVehicleMaintenance(response.data);
      } catch (error) {
        console.log("fetchVehicleMaintenance Failed", error.response);
      }
    };
    fetchVehicleMaintenance();
  }, [activeVehicle]);

  // Handlers:
  const handleEditVehicle = () => {
    setShowModal(true);
    setModalFormTitle(`Edit Vehicle "${activeVehicle.name}"`);
    setModalForm(
      <EditVehicleForm
        setShowModal={setShowModal}
        activeVehicle={activeVehicle}
      />
    );
  };

  const handleDelete = () => {
    setShowModal(true);
    setModalFormTitle(`DELETE Vehicle "${activeVehicle.name}"`);
    setModalForm(
      <DeleteConfirmationForm
        setShowModal={setShowModal}
        activeVehicle={activeVehicle}
      />
    );
  };

  // Console Logs:
  console.log("Active Vehicle... Vehicle Page", activeVehicle);
  console.log("Vehicle Fillups", vehicleFillups);

  return (
    <div>
      <p>Name: {activeVehicle.name}</p>
      <p>Year: {activeVehicle.year}</p>
      <p>Make: {activeVehicle.make}</p>
      <p>Model: {activeVehicle.model}</p>
      <p>Type: {activeVehicle.type}</p>
      <p>Active: {activeVehicle.active}</p>
      <p>Odometer: {activeVehicle.odometer}</p>
      <button onClick={handleEditVehicle}>Edit Vehicle</button>
      <button onClick={handleDelete}>DELETE Vehicle</button>
      {/* <Routes>
        <Route
        path=""
        />
      </Routes> */}
    </div>
  );
};

export default VehiclePage;
