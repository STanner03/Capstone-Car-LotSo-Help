// Imports:
import { useState } from "react";
import DeleteMaintenanceForm from "../forms/MaintenanceForms/DeleteMaintenanceForm/DeleteMaintenanceForm.jsx";
import EditMaintenanceForm from "../forms/MaintenanceForms/EditMaintenanceForm/EditMaintenanceForm.jsx";
import "./MaintenanceRecord.css";

const MaintenanceRecord = ({
  i,
  maintenance,
  setShowModal,
  setModalForm,
  setModalFormTitle,
  activeVehicle,
}) => {
  // State Variables:
  const [show, setShow] = useState(false);

  // Handlers:
  const handleSelect = () => {
    setShow(!show);
  };
  const handleEditMaintenance = () => {
    setShowModal(true);
    setModalFormTitle(
      `Edit Maintenance Record #${i} for ${activeVehicle.name}`
    );
    setModalForm(
      <EditMaintenanceForm
        maintenance={maintenance}
        setShowModal={setShowModal}
        activeVehicle={activeVehicle}
      />
    );
  };
  const handleDelete = () => {
    setShowModal(true);
    setModalFormTitle(
      `Delete Maintenance #${i} from ${maintenance.date} date for ${activeVehicle.name}`
    );
    setModalForm(
      <DeleteMaintenanceForm
        maintenance={maintenance}
        setShowModal={setShowModal}
        activeVehicle={activeVehicle}
      />
    );
    console.log("Active Maintenance", maintenance);
  };
  return (
    <div className="mr-style">
      <button className="mr-but" onClick={handleSelect}>
        <table>
          <thead>
            <h2>
              Maintenance Record #{i}, {maintenance.date}
            </h2>
          </thead>
          <td>
            <tr>
              <td>
                <p>Shop: {maintenance.shop_name}</p>
              </td>
              <td>
                <p>Odometer: {maintenance.odometer} miles</p>
              </td>
              <td>
                <p>Total: ${maintenance.total_cost}</p>
              </td>
            </tr>
          </td>
        </table>
      </button>
      {show && (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Miles to next service</th>
              <th>Previous Odometer</th>
              <th>Odometer</th>
              <th>Total Price</th>
              <th>Shop Name</th>
              <th>Notes</th>
              <th>
                <button onClick={handleEditMaintenance}>
                  Edit Maintenance
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{maintenance.date}</td>
              <td>{maintenance.description}</td>
              <td>{maintenance.service_interval_miles}</td>
              <td>{maintenance.prev_odometer}</td>
              <td>{maintenance.odometer}</td>
              <td>{maintenance.total_cost}</td>
              <td>{maintenance.shop_name}</td>
              <td>{maintenance.notes}</td>
              <td>
                <button onClick={handleDelete}>Delete Maintenance</button>
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MaintenanceRecord;
