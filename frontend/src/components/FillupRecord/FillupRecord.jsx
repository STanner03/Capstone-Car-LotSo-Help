// Imports:
import { useState } from "react";
import DeleteFillupForm from "../forms/FillupForms/DeleteFillupForm/DeleteFillupForm";
import EditFillupForm from "../forms/FillupForms/EditFillupForm/EditFillupForm";

const FillupRecord = ({
  fillup,
  setShowModal,
  setModalForm,
  vehicleFillups,
  setModalFormTitle,
  activeVehicle,
}) => {
  // State Variables:
  const [activeFillup, setActiveFillup] = useState();
  const [show, setShow] = useState(true);

  // Handlers:
  const handleSelect = () => {
    setActiveFillup(fillup);
    setShow(!show);
  };
  const handleEditFillup = () => {
    setShowModal(true);
    setModalFormTitle(
      `Edit Fill-up Record from ${fillup.date} for ${activeVehicle.name}`
    );
    setModalForm(
      <EditFillupForm
        setShowModal={setShowModal}
        activeVehicle={activeVehicle}
        fillup={fillup}
      />
    );
    console.log("Active Fill-up", fillup);
  };
  const handleDelete = () => {
    setShowModal(true);
    setModalFormTitle(
      `Delete Fill-up from ${fillup.date} for ${activeVehicle.name}`
    );
    setModalForm(<DeleteFillupForm />);
    console.log("Active Fill-up", fillup);
  };
  return (
    <div>
      <button onClick={handleSelect}>
        <h2>{fillup.date}</h2>
        <p>Gal Price: ${fillup.fuel_price_per_gallon}</p>
        <p>Volume: {fillup.fuel_volume}</p>
        <p>Total: ${fillup.total_cost}</p>
      </button>
      {show && (
        <table>
          <thead>
            <th>Individual Fill-up Information</th>
            <tr>
              <th>Date</th>
              <th>Price Gal</th>
              <th>Volume</th>
              <th>Total Price</th>
              <th>Fuel Type/Grade</th>
              <th>Previous Odometer</th>
              <th>Odometer</th>
              <th>Station/Location</th>
              <th>Notes</th>
              <button onClick={handleEditFillup}>Edit Fill-up</button>
            </tr>
          </thead>
          <tr>
            <td>{fillup.date}</td>
            <td>{fillup.fuel_price_per_gallon}</td>
            <td>{fillup.fuel_volume}</td>
            <td>{fillup.total_cost}</td>
            <td>{fillup.fuel_type}</td>
            <td>{fillup.prev_odometer}</td>
            <td>{fillup.odometer}</td>
            <td>{fillup.station_name}</td>
            <td>{fillup.notes}</td>
            <button onClick={handleDelete}>Delete Fill-up</button>
          </tr>
        </table>
      )}
    </div>
  );
};

export default FillupRecord;
