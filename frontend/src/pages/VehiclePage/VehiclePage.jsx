import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";

const VehiclePage = ({ addVehicleModal, setAddVehicleModal, activeVehicle }) => {
  // State Variables
  const [user, token] = useAuth();
  const [vehicleFillups, setVehicleFillups] = useState([]);

  // UseEffects:
  useEffect(() => {
    const fetchVehicleFillups = async () => {
      try {
        let response = await axios.get(
          `http://127.0.0.1:8000/api/vehicle/${activeVehicle.id}/fillup/all/`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setVehicleFillups(response.data);
      } catch (error) {
        console.log("fetchVehicleFillups Failed", error.response);
      }
    };
    fetchVehicleFillups();
  }, [activeVehicle]);



  // Console Logs:
  console.log("Active Vehicle... Vehicle Page", activeVehicle);
  console.log("Vehicle Fillups", vehicleFillups);

  return (
    <div>
      <p>{activeVehicle.name}</p>
      <p>{activeVehicle.year}</p>
      <p>{activeVehicle.make}</p>
      <p>{activeVehicle.model}</p>
      <p>{activeVehicle.type}</p>
      <p>{activeVehicle.odometer}</p>

    </div>
  );
};

export default VehiclePage;
