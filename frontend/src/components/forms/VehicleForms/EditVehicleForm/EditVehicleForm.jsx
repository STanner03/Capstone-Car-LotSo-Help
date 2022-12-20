// Imports:
import axios from "axios";
import useAuth from "../../../../hooks/useAuth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const EditVehicleForm = ({ setShowModal, activeVehicle }) => {
  // State Variables:
  const [user, token] = useAuth();
  const [vin, setVin] = useState(activeVehicle.vin);
  const [name, setName] = useState(activeVehicle.name);
  const [type, setType] = useState(activeVehicle.type);
  const [make, setMake] = useState(activeVehicle.make);
  const [model, setModel] = useState(activeVehicle.model);
  const [year, setYear] = useState(activeVehicle.year);
  const [color, setColor] = useState(activeVehicle.color);
  const [active, setActive] = useState(activeVehicle.active);
  const [odometer, setOdometer] = useState(activeVehicle.odometer);

  // Variables:
  const navigate = useNavigate();

  // ASYNC Functions:
  async function editVehicle(vehicle) {
    try {
      let response = await axios.put(
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

  // Handlers:
  const handleVin = (e) => setVin(e.target.value);
  const handleName = (e) => setName(e.target.value);
  const handleType = (e) => setType(e.target.value);
  const handleMake = (e) => setMake(e.target.value);
  const handleModel = (e) => setModel(e.target.value);
  const handleYear = (e) => setYear(e.target.value);
  const handleColor = (e) => setColor(e.target.value);
  const handleCheckbox = (e) => {
    const checked = e.target.checked;
    if (checked) {
      setActive(true);
    } else {
      setActive(false);
    }
  };
  const handleOdometer = (e) => setOdometer(e.target.value);
  const handleCancel = () => {
    setShowModal(false);
    navigate("/vehicle");
  };

  function handleSubmit(e) {
    e.preventDefault();
    let tempVehicle = {
      vin: vin,
      name: name,
      type: type,
      make: make,
      model: model,
      year: year,
      color: color,
      active: active,
      odometer: odometer,
    };
    editVehicle(tempVehicle);
    setShowModal(false);
  }

  // Console Logs:
  // console.log("Active", active);
  // console.log("Active Vehicle: Active Status", activeVehicle.active);

  return (
    <form className="form-style" onSubmit={handleSubmit}>
      <div>
        <label>
          VIN
          <input
            placeholder="Vehicle Identification Number"
            type="text"
            value={vin}
            onChange={handleVin}
          />
        </label>
      </div>
      <div>
        <label>
          NAME
          <input
            placeholder="Give your vehicle a name"
            type="text"
            value={name}
            onChange={handleName}
          />
        </label>
      </div>
      <div>
        <label>
          TYPE
          <input
            placeholder="What type of vehicle is it?"
            type="text"
            value={type}
            onChange={handleType}
          />
        </label>
      </div>
      <div>
        <label>
          MAKE
          <input
            placeholder="What is the make of the vehicle?"
            type="text"
            value={make}
            onChange={handleMake}
          />
        </label>
      </div>
      <div>
        <label>
          MODEL
          <input
            placeholder="What is the model of the vehicle?"
            type="text"
            value={model}
            onChange={handleModel}
          />
        </label>
      </div>
      <div>
        <label>
          YEAR
          <input
            placeholder="When was the vehicle manufactured?"
            type="number"
            value={year}
            onChange={handleYear}
          />
        </label>
      </div>
      <div>
        <label>
          COLOR
          <input
            placeholder="What color is the vehicle?"
            type="text"
            value={color}
            onChange={handleColor}
          />
        </label>
      </div>
      <div>
        <label>
          Do you want to keep records of this vehicle?
          <input type="checkbox" value={active} onChange={handleCheckbox} />
        </label>
      </div>
      <div>
        <label>
          ODOMETER
          <input
            placeholder="How many MILES are on the odometer?"
            type="number"
            value={odometer}
            onChange={handleOdometer}
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

export default EditVehicleForm;
