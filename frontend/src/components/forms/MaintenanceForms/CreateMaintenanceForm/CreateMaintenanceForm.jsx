// Imports:
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";

const CreateMaintenanceForm = ({ setShowModal, activeVehicle }) => {
  // State Variables:
  const [user, token] = useAuth();
  const [description, setDescription] = useState("");
  const [shopName, setShopName] = useState("NA");
  const [serviceIntervalMi, setServiceIntervalMi] = useState(5000);
  const [odometer, setOdometer] = useState(activeVehicle.odometer);
  const [prevOdometer] = useState(activeVehicle.odometer);
  const [totalCost, setTotalCost] = useState(0.0);
  const [date, setDate] = useState("0000/00/00");
  const [notes, setNotes] = useState("No Notes");

  // Variables:
  const navigate = useNavigate();

  // ASYNC Functions:
  async function addMaintenance(record) {
    try {
      await axios.post(
        `http://127.0.0.1:8000/api/vehicle/${activeVehicle.id}/maintenance/`,
        record,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      navigate("/vehicle");
    } catch (error) {
      console.log(error, "Unable to Create Record");
    }
  }
  async function editVehicle(vehicle) {
    try {
      await axios.put(
        `http://127.0.0.1:8000/api/vehicle/${activeVehicle.id}/update/`,
        vehicle,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      navigate("/");
    } catch (error) {
      console.log(error, "Unable to Edit Vehicle");
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
    let tempVehicle = {
      vin: activeVehicle.vin,
      name: activeVehicle.name,
      type: activeVehicle.type,
      make: activeVehicle.make,
      model: activeVehicle.model,
      year: activeVehicle.year,
      color: activeVehicle.color,
      active: activeVehicle.active,
      odometer: odometer,
    };
    if (odometer >= activeVehicle.odometer) {
      editVehicle(tempVehicle);
      addMaintenance(tempMaintenance);
      setShowModal(false);
    }
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

  // Console Logs:

  return (
    <form className="form-style" onSubmit={handleSubmit}>
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
        <button className="cncl-btn" onClick={handleCancel}>
          CANCEL
        </button>
        <button className="save-btn" type="submit">
          SAVE
        </button>
      </div>
    </form>
  );
};

export default CreateMaintenanceForm;
