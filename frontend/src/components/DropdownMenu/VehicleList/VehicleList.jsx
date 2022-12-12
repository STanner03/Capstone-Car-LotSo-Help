import Vehicle from "./Vehicle/Vehicle.jsx"

const VehicleList = ({ vehicles, setActiveVehicle }) => {
    return ( 
    <div>
        {vehicles.map((vehicle, i) => (
        <Vehicle key={i} vehicle={vehicle} setActiveVehicle={setActiveVehicle} />
        ))}
    </div> );
}
 
export default VehicleList;