// Imports:
import axios from "axios";
import useAuth from "../../../../hooks/useAuth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const EditMaintenanceForm = ({ maintenance, setShowModal, activeVehicle }) => {
  // State Variables:
  const [user, token] = useAuth();
  const [description, setDescription] = useState(maintenance.description);
  const [shopName, setShopName] = useState(maintenance.shop_name);
  const [serviceIntervalMi, setServiceIntervalMi] = useState(
    maintenance.service_interval_miles
  );
  const [odometer, setOdometer] = useState(maintenance.odometer);
  const [prevOdometer] = useState(maintenance.prev_odometer);
  const [totalCost, setTotalCost] = useState(maintenance.total_cost);
  const [date, setDate] = useState(maintenance.date);
  const [notes, setNotes] = useState(maintenance.notes);

  // Variables:
  const navigate = useNavigate();

  // ASYNC Functions:
  async function editMaintenance(record) {
    try {
      await axios.put(
        `http://127.0.0.1:8000/api/vehicle/${activeVehicle.id}/maintenance/${maintenance.id}/update/`,
        record,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      navigate("/");
    } catch (error) {
      console.log(error, "Unable to Edit Record");
    }
  }

  // Functions:
  function handleSubmit(e) {
    e.preventDefault();
    let tempMaintenance = {
      description: description,
      shop_name: shopName,
      service_interval_miles: serviceIntervalMi,
      odometer: odometer,
      prev_odometer: prevOdometer,
      total_cost: totalCost,
      date: date,
      notes: notes,
    };
    editMaintenance(tempMaintenance);
    setShowModal(false);
  }

  // Handlers:
  const handleShopName = (e) => setShopName(e.target.value);
  const handleDate = (e) => setDate(e.target.value);
  const handleDescription = (e) => setDescription(e.target.value);
  const handleServiceInterval = (e) => setServiceIntervalMi(e.target.value);
  const handleOdometer = (e) => setOdometer(e.target.value);
  const handleCost = (e) => setTotalCost(e.target.value);
  const handleNotes = (e) => {
    if (e.target.value.length > 0) {
      setNotes(e.target.value);
    } else {
      setNotes("No Note");
    }
  };
  const handleCancel = () => {
    setShowModal(false);
    navigate("/vehicle/maintenance");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Shop Title
          <input
            placeholder="Shop/Garage Name"
            type="text"
            value={shopName}
            onChange={handleShopName}
          />
        </label>
      </div>
      <div>
        <label>
          Short description of service
          <input
            placeholder="Description"
            type="text"
            value={description}
            onChange={handleDescription}
          />
        </label>
      </div>
      <div>
        <label>
          Service Interval in Miles
          <input
            placeholder="Miles till next service"
            type="number"
            value={serviceIntervalMi}
            onChange={handleServiceInterval}
          />
        </label>
      </div>
      <div>Previous odometer: {prevOdometer}</div>
      <div>
        <label>
          Odometer
          <input
            placeholder="Current Odometer"
            type="number"
            value={odometer}
            onChange={handleOdometer}
          />
        </label>
      </div>
      <div>
        <label>
          Cost of service
          <input
            placeholder="Price"
            type="float"
            value={totalCost}
            onChange={handleCost}
          />
        </label>
      </div>
      <div>
        <label>
          Today's Date
          <input type="date" value={date} onChange={handleDate} />
        </label>
      </div>
      <div>
        <label>
          Notes
          <input
            placeholder="Notes"
            type="text"
            value={notes}
            onChange={handleNotes}
          />
        </label>
      </div>
      <p>**MUST FILL OUT ALL FIELDS**</p>
      <div>
        <button onClick={handleCancel}>CANCEL</button>
        <button type="submit">SAVE</button>
      </div>
    </form>
  );
};

export default EditMaintenanceForm;
