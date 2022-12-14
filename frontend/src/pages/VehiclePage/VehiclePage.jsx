// General Imports:
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

// Component Imports:
import EditVehicleForm from "../../components/forms/EditVehicleForm/EditVehicleForm";
import DeleteConfirmationForm from "../../components/forms/DeleteConfirmationForm/DeleteConfirmationForm";

// Util Imports:
import useAuth from "../../hooks/useAuth";

const VehiclePage = ({
  setShowModal,
  setModalForm,
  activeVehicle,
  setVehicleFormFunction,
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
    setVehicleFormFunction("Edit");
    setModalForm(
      <EditVehicleForm
        setShowModal={setShowModal}
        activeVehicle={activeVehicle}
      />
    );
  };

  const handleDelete = () => {
    setShowModal(true);
    setVehicleFormFunction("DELETE");
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
    </div>
  );
};

export default VehiclePage;
