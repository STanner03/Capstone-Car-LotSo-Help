// Imports:
import axios from "axios";
import useAuth from "../../../../hooks/useAuth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddVehicleForm = ({ setShowModal }) => {
  // State Variables:
  const [user, token] = useAuth();
  const [vin, setVin] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState();
  const [color, setColor] = useState("");
  const [active, setActive] = useState(false);
  const [odometer, setOdometer] = useState();

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
    setShowModal(false);
    navigate("/");
  };

  // Functions:
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
    setShowModal(false);
  }

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
            placeholder="Car, Truck, SUV, Van?"
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
            placeholder="Chevrolet, Ford, Mercedes..."
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
            placeholder="A 220, Corvette, Pinto"
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
            placeholder="Manufacture Year?"
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
            placeholder="MILES on the odometer?"
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

export default AddVehicleForm;
