// Imports:
import axios from "axios";
import useAuth from "../../../../hooks/useAuth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateFillupForm = ({ setShowModal, activeVehicle, vehicleFillups }) => {
  // State Variables:
  const [user, token] = useAuth();
  const [stationName, setStationName] = useState();
  const [odometer, setOdometer] = useState();
  const [prevOdometer] = useState(activeVehicle.odometer);
  const [fuelType, setFuelType] = useState();
  const [fuelPPG, setFuelPPG] = useState();
  const [fuelVolume, setFuelVolume] = useState();
  const [cost, setCost] = useState();
  const [date, setDate] = useState();
  const [notes, setNotes] = useState();

  // Variables:
  const navigate = useNavigate();

  // ASYNC Functions:
  async function addFillup(record) {
    try {
      let response = await axios.post(
        `http://127.0.0.1:8000/api/vehicle/${activeVehicle.id}/fillup/`,
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
      station_name: stationName,
      total_cost: cost,
    };
    addFillup(tempFillup);
    setShowModal(false);
  }

  // Handlers:
  const handleStationName = (e) => setStationName(e.target.value);
  const handleOdometer = (e) => setOdometer(e.target.value);
  const handleFuelType = (e) => setFuelType(e.target.value);
  const handleFuelPPG = (e) => setFuelPPG(e.target.value);
  const handleFuelVolume = (e) => setFuelVolume(e.target.value);
  const handleCost = (e) => setCost(e.target.value);
  const handleDate = (e) => setDate(e.target.value);
  const handleNotes = (e) => setNotes(e.target.value);
  const handleCancel = () => {
    setShowModal(false);
    navigate("/vehicle/fillup");
  };

  // Console Logs:
  console.log("Previous Odometer", prevOdometer);

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Station
        <input
          placeholder="Gas Station Name"
          type="text"
          value={stationName}
          onChange={handleStationName}
        />
      </label>
      <p>Previous odometer: {prevOdometer}</p>
      <label>
        Odometer reading today
        <input
          placeholder="Current Odometer"
          type="number"
          value={odometer}
          onChange={handleOdometer}
        />
      </label>
      <label>
        Fuel type/ rating
        <input
          placeholder="Fuel Rating"
          type="text"
          value={fuelType}
          onChange={handleFuelType}
        />
      </label>
      <label>
        Price Per Gallon
        <input
          placeholder="What is the Price per Gallon?"
          type="float"
          value={fuelPPG}
          onChange={handleFuelPPG}
        />
      </label>
      <label>
        Volume of fuel
        <input
          placeholder="How much fuel did you add?"
          type="number"
          value={fuelVolume}
          onChange={handleFuelVolume}
        />
      </label>
      <label>
        Total Price
        <input
          placeholder="How much was this fillup?"
          type="float"
          value={cost}
          onChange={handleCost}
        />
      </label>
      <label>
        Today's Date
        <input type="date" value={date} onChange={handleDate} />
      </label>
      <label>
        Notes
        <input
          placeholder="Notes"
          type="text"
          value={notes}
          onChange={handleNotes}
        />
      </label>
      <div>
        <button onClick={handleCancel}>CANCEL</button>
        <button type="submit">SAVE</button>
      </div>
    </form>
  );
};

export default CreateFillupForm;
