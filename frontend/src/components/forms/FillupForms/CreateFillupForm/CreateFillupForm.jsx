// Imports:
import axios from "axios";
import useAuth from "../../../../hooks/useAuth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../../../Modal/Modal";

const CreateFillupForm = ({ setShowModal, activeVehicle, vehicleFillups }) => {
  // State Variables:
  const [user, token] = useAuth();
  const [stationName, setStationName] = useState("N/A");
  const [odometer, setOdometer] = useState(
    vehicleFillups[vehicleFillups.length - 1].odometer
  );
  const [prevOdometer] = useState(
    vehicleFillups[vehicleFillups.length - 1].odometer
  );
  const [fuelType, setFuelType] = useState("");
  const [fuelPPG, setFuelPPG] = useState(0.0);
  const [fuelVolume, setFuelVolume] = useState(0.0);
  const [economy, setEconomy] = useState(0.0);
  const [cost, setCost] = useState(0.0);
  const [date, setDate] = useState("0000/00/00");
  const [notes, setNotes] = useState("No Notes");
  const [show, setShow] = useState(false);

  // Variables:
  const navigate = useNavigate();

  // UseEffect:
  useEffect(() => {
    setCost(parseFloat(fuelPPG * parseFloat(fuelVolume)).toFixed(2));
    setEconomy(
      parseFloat((odometer - prevOdometer) / parseFloat(fuelVolume)).toFixed(2)
    );
  }, [fuelVolume, fuelPPG]);

  // ASYNC Functions:
  async function addFillup(record) {
    try {
      await axios.post(
        `http://127.0.0.1:8000/api/vehicle/${activeVehicle.id}/fillup/`,
        record,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
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
    let tempFillup = {
      date: date,
      fuel_price_per_gallon: fuelPPG,
      fuel_type: fuelType,
      fuel_volume: fuelVolume,
      notes: notes,
      odometer: odometer,
      prev_odometer: prevOdometer,
      mpg: economy,
      station_name: stationName,
      total_cost: cost,
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
      addFillup(tempFillup);
      setShowModal(false);
    } else {
      setShow(true);
    }
  }

  // Handlers:
  const handleStationName = (e) => setStationName(e.target.value);
  const handleOdometer = (e) => setOdometer(e.target.value);
  const handleFuelType = (e) => setFuelType(e.target.value);
  const handleFuelPPG = (e) => setFuelPPG(e.target.value);
  const handleFuelVolume = (e) => setFuelVolume(e.target.value);
  const handleDate = (e) => setDate(e.target.value);
  const handleNotes = (e) => {
    if (e.target.value.length > 0) {
      setNotes(e.target.value);
    } else {
      setNotes("No Note");
    }
  };
  const handleCancel = () => {
    setShowModal(false);
    navigate("/vehicle/fillup");
  };
  const handleClose = () => setShow(false);

  return (
    <form className="form-style" onSubmit={handleSubmit}>
      <div>
        <label>
          Station
          <input
            placeholder="Gas Station Name"
            type="text"
            value={stationName}
            onChange={handleStationName}
          />
        </label>
      </div>
      <div>Previous odometer: {prevOdometer}</div>
      <div>
        <label>
          Odometer reading today
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
          Fuel type/ rating
          <input
            placeholder="Fuel Rating"
            type="text"
            value={fuelType}
            onChange={handleFuelType}
          />
        </label>
      </div>
      <div>
        <label>
          Price Per Gallon
          <input
            placeholder="What is the Price per Gallon?"
            type="float"
            value={fuelPPG}
            onChange={handleFuelPPG}
          />
        </label>
      </div>
      <div>
        <label>
          Volume of fuel
          <input
            placeholder="How much fuel did you add?"
            type="number"
            value={fuelVolume}
            onChange={handleFuelVolume}
          />
        </label>
      </div>
      <div>MPG: {economy}</div>
      <div>Total price: ${cost}</div>
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
            type="text-field"
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
      <Modal show={show} onClose={handleClose} title={"Invalid Input"}>
        <div>
          <p>Check Odometer Reading! </p>
          <p>Value Below Vehicle Odometer.</p>
          <button onClick={handleClose}>OK</button>
        </div>
      </Modal>
    </form>
  );
};

export default CreateFillupForm;
