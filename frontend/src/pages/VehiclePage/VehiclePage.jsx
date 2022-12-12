import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";

const VehiclePage = ({ activeVehicle }) => {
    // State Variables
    const [user, token] = useAuth();
    const [vehicleFillups, setVehicleFillups] = useState([])

  // Variables
//   const vehicleFillups = [];

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

  console.log("Active Vehicle... Vehicle Page", activeVehicle);
  console.log("Vehicle Fillups", vehicleFillups);

  return (
    <div>
      {activeVehicle.name}
      {activeVehicle.year}
      {activeVehicle.make}
      {activeVehicle.model}
      {activeVehicle.type}
      {activeVehicle.odometer}
    </div>
  );
};

export default VehiclePage;
