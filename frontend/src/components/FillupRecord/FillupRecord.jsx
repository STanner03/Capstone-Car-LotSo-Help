// Imports:
import { useState } from "react";
import DeleteFillupForm from "../forms/FillupForms/DeleteFillupForm/DeleteFillupForm";
import EditFillupForm from "../forms/FillupForms/EditFillupForm/EditFillupForm";
import "./FillupRecord.css";

const FillupRecord = ({
  i,
  fillup,
  setShowModal,
  setModalForm,
  setModalFormTitle,
  activeVehicle,
}) => {
  // State Variables:
  const [show, setShow] = useState(true);

  // Handlers:
  const handleSelect = () => {
    setShow(!show);
  };
  const handleEditFillup = () => {
    setShowModal(true);
    setModalFormTitle(
      `Edit Fill-up Record #${i} on ${fillup.date} for ${activeVehicle.name}`
    );
    setModalForm(
      <EditFillupForm
        fillup={fillup}
        setShowModal={setShowModal}
        activeVehicle={activeVehicle}
      />
    );
  };
  const handleDelete = () => {
    setShowModal(true);
    setModalFormTitle(
      `Delete Fill-up #${i} on ${fillup.date} for ${activeVehicle.name}`
    );
    setModalForm(
      <DeleteFillupForm
        fillup={fillup}
        setShowModal={setShowModal}
        activeVehicle={activeVehicle}
      />
    );
  };

  return (
    <div className="fur-style">
      {show ? (
        <div>
          <button onClick={handleSelect}>See Fill-up Details</button>
          <table>
            <tbody>
              <tr>
                <td>#{i}</td>
                <td>Date: {fillup.date}</td>
                <td>Gal Price: ${fillup.fuel_price_per_gallon}</td>
                <td>Volume: {fillup.fuel_volume}</td>
                <td>Total: ${fillup.total_cost}</td>
                <td>MPG:{fillup.mpg}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          <button onClick={handleSelect}>Hide Details</button>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Price Gal</th>
                <th>Volume</th>
                <th>Total Price</th>
                <th>Fuel Type/Grade</th>
                <th>Odometer</th>
                <th>Previous Odometer</th>
                <th>Miles Traveled</th>
                <th>MPG</th>
                <th>Station/Location</th>
                <th>Notes</th>
                <th>
                  <button onClick={handleEditFillup}>Edit Fill-up</button>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{fillup.date}</td>
                <td>${fillup.fuel_price_per_gallon}</td>
                <td>{fillup.fuel_volume}</td>
                <td>${fillup.total_cost}</td>
                <td>{fillup.fuel_type}</td>
                <td>{fillup.odometer} Mi</td>
                <td>{fillup.prev_odometer} Mi</td>
                <td>{fillup.odometer - fillup.prev_odometer} Mi</td>
                <td>{fillup.mpg} mpg</td>
                <td>{fillup.station_name}</td>
                <td>{fillup.notes}</td>
                <td>
                  <button onClick={handleDelete}>Delete Fill-up</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FillupRecord;
