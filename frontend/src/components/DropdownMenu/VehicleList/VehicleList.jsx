import Vehicle from "./Vehicle/Vehicle.jsx";

const VehicleList = ({ handleOpen, vehicles, setActiveVehicle }) => {
  return (
    <div>
      {vehicles.map((vehicle, i) => (
        <Vehicle
          key={i}
          handleOpen={handleOpen}
          vehicle={vehicle}
          setActiveVehicle={setActiveVehicle}
        />
      ))}
    </div>
  );
};

export default VehicleList;
