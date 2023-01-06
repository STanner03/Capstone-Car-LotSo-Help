import { useNavigate } from "react-router-dom";
import "./Vehicle.css";

const Vehicle = ({ handleOpen, vehicle, setActiveVehicle }) => {
  const navigate = useNavigate();

  const handleSelect = (e) => {
    setActiveVehicle(vehicle);
    handleOpen();
    navigate("/vehicle");
  };
  return (
    <div>
      <button className="v-button" onClick={handleSelect}>
        <h2>{vehicle.name}</h2>
        <p>{`${vehicle.year} ${vehicle.make} ${vehicle.model}`}</p>
      </button>
    </div>
  );
};

export default Vehicle;
