// General Imports:
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

// Component Imports:
import EditVehicleForm from "../../components/forms/VehicleForms/EditVehicleForm/EditVehicleForm";
import DeleteConfirmationForm from "../../components/forms/VehicleForms/DeleteConfirmationForm/DeleteConfirmationForm";

// Page Imports:
import FillupPage from "../FillupPage/FillupPage";
import MaintenancePage from "../MaintenancePage/MaintenancePage";

// Util Imports:
import useAuth from "../../hooks/useAuth";
import PrivateRoute from "../../utils/PrivateRoute";

// CSS Import:
import "./VehiclePage.css";

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

  // Variables:
  const navigate = useNavigate();

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
  }, [activeVehicle, vehicleFillups.length]);

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
  }, [activeVehicle, vehicleMaintenance.length]);

  // Functions:

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
  const handleShowFillups = () => {
    navigate("/vehicle/fillup");
  };
  const handleShowMaintenance = () => {
    navigate("/vehicle/maintenance");
  };

  return (
    <div className="vp-style">
      <table>
        <tr>
          <td>
            {activeVehicle.name}
          </td>
          <td>
            {activeVehicle.year} {activeVehicle.make} {activeVehicle.model}
          </td>
          <td>{activeVehicle.odometer} Miles driven</td>
          <td>Type: {activeVehicle.type}</td>
          <td>
            Active: {activeVehicle.active ? <CheckIcon /> : <CloseIcon />}
          </td>
        </tr>
      </table>
      <div>
        <button onClick={handleEditVehicle}>Edit Vehicle</button>
        <button onClick={handleDelete}>DELETE Vehicle</button>
        <button onClick={handleShowFillups}>Show Fill-up Records</button>
        <button onClick={handleShowMaintenance}>
          Show Maintenance Records
        </button>
      </div>
      <Routes>
        <Route
          path="/fillup"
          element={
            <PrivateRoute>
              <FillupPage
                setShowModal={setShowModal}
                setModalForm={setModalForm}
                setModalFormTitle={setModalFormTitle}
                activeVehicle={activeVehicle}
                vehicleFillups={vehicleFillups}
              />
            </PrivateRoute>
          }
        />
        <Route
          path="/maintenance"
          element={
            <PrivateRoute>
              <MaintenancePage
                setShowModal={setShowModal}
                setModalForm={setModalForm}
                setModalFormTitle={setModalFormTitle}
                activeVehicle={activeVehicle}
                vehicleMaintenance={vehicleMaintenance}
              />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default VehiclePage;
