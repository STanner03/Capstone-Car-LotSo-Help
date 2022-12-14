// Imports:
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

let defaultVehicle = {
  vin: "",
  name: "",
  type: "",
  make: "",
  model: "",
  year: 0,
  color: "",
  active: true,
  odometer: 0,
};

const AddVehicleForm = ({ setAddVehicleModal }) => {
  // State Variables:
  const [user, token] = useAuth();
  const [newVehicle, setNewVehicle] = useState(defaultVehicle);
  const [vin, setVin] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState(0);
  const [color, setColor] = useState("");
  const [active, setActive] = useState(false);
  const [odometer, setOdometer] = useState(0);

  // Variables:
  const navigate = useNavigate();

  // ASYNC Functions:
  async function addNewVehicle(vehicle) {
    try {
      let response = await axios.post(
        "http://127.0.0.1:8000/api/vehicle/",
        vehicle,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log("ASYNC New Vehicle", newVehicle);
      console.log("Vehicle", vehicle);
      navigate("/");
    } catch (error) {
      console.log(error, "Unable to Create Vehicle");
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
  const handleCheckbox = (e) => setActive(!active);
  const handleOdometer = (e) => setOdometer(e.target.value);
  const handleCancel = () => {
    setAddVehicleModal(false);
    navigate("/");
  };
  console.log("Checkbox", active);
  function handleSubmit(e) {
    e.preventDefault();
    let tempNewVehicle = {
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
    addNewVehicle(tempNewVehicle);
    setNewVehicle(tempNewVehicle);
    setAddVehicleModal(false);
    console.log("Submit New Vehicle", tempNewVehicle);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        VIN
        <input
          placeholder="Vehicle Identification Number"
          type="text"
          value={vin}
          onChange={handleVin}
        />
      </label>
      <label>
        NAME
        <input
          placeholder="Give your vehicle a name"
          type="text"
          value={name}
          onChange={handleName}
        />
      </label>
      <label>
        TYPE
        <input
          placeholder="What type of vehicle is it?"
          type="text"
          value={type}
          onChange={handleType}
        />
      </label>
      <label>
        MAKE
        <input
          placeholder="What is the make of the vehicle?"
          type="text"
          value={make}
          onChange={handleMake}
        />
      </label>
      <label>
        MODEL
        <input
          placeholder="What is the model of the vehicle?"
          type="text"
          value={model}
          onChange={handleModel}
        />
      </label>
      <label>
        YEAR
        <input
          placeholder="When was the vehicle manufactured?"
          type="number"
          value={year}
          onChange={handleYear}
        />
      </label>
      <label>
        COLOR
        <input
          placeholder="What color is the vehicle?"
          type="text"
          value={color}
          onChange={handleColor}
        />
      </label>
      <label>
        Do you want to keep records of this vehicle?
        <input type="checkbox" value={active} onChange={handleCheckbox} />
      </label>
      <label>
        ODOMETER
        <input
          placeholder="How many MILES are on the odometer?"
          type="number"
          value={odometer}
          onChange={handleOdometer}
        />
      </label>
      <div>
        <button onClick={handleCancel}>CANCEL</button>
        <button type="submit">SAVE</button>
      </div>
    </form>
  );
};

export default AddVehicleForm;
