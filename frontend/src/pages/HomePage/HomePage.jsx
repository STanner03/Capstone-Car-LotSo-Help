import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const HomePage = ({ vehicles, setVehicles, setActiveVehicle }) => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  //TODO: Add an AddCars Page to add a car for a logged in user's garage

  // State Variables:
  const [user, token] = useAuth();
  const [fillups, setFillups] = useState([]);
  const [maintenanceRecords, setMaintenanceRecords] = useState([]);

  // Variables:
  // const userFillupsTotal = 0
  // const userGasVolumeTotal = 0;
  // const userAvgPerGalCost = 0.0;
  // const userMaintenanceTotal = 0;
  // const userTotalMiles = 0;
  // const userAvgPerMileCost = 0.0;

  // UseEffects:

  // const [cars, setCars] = useState([]);
  // useEffect(() => {
  //   const fetchCars = async () => {
  //     try {
  //       let response = await axios.get("http://127.0.0.1:8000/api/cars/", {
  //         headers: {
  //           Authorization: "Bearer " + token,
  //         },
  //       });
  //       setCars(response.data);
  //     } catch (error) {
  //       console.log(error.response.data);
  //     }
  //   };
  //   fetchCars();
  // }, [token]);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        let response = await axios.get("http://127.0.0.1:8000/api/vehicle/", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setVehicles(response.data);
      } catch (error) {
        console.log(error, "Could not fetch Vehicles");
      }
    };
    fetchVehicles();
  }, [token, vehicles.length]);

  useEffect(() => {
    const fetchFillups = async () => {
      try {
        let response = await axios.get(
          "http://127.0.0.1:8000/api/vehicle/6/fillup/",
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setFillups(response.data);
      } catch (error) {
        console.log(error, "Could not fetch Fillups");
      }
    };
    fetchFillups();
  }, [token, vehicles.length]);

  useEffect(() => {
    const fetchMaintenanceRecords = async () => {
      try {
        let response = await axios.get(
          "http://127.0.0.1:8000/api/vehicle/6/maintenance/",
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setMaintenanceRecords(response.data);
      } catch (error) {
        console.log(error, "Could not fetch Maintenance Records");
      }
    };
    fetchMaintenanceRecords();
  }, [token, vehicles.length]);

  // Functions:
  function findTotalCostofGas() {
    const fillupTotalCosts = fillups.map((el, i) => {
      return el.total_cost;
    });
    if (fillupTotalCosts.length > 0) {
      const userFillupsTotal = fillupTotalCosts.reduce((total, fillup) => {
        return total + fillup;
      });
      return userFillupsTotal;
    } else {
      return 0;
    }
  }

  function findTotalCostofMaintenace() {
    const maintenanceRecordTotalCosts = maintenanceRecords.map((el, i) => {
      return el.total_cost;
    });
    if (maintenanceRecordTotalCosts.length > 0) {
      const userMaintenanceRecordsTotal = maintenanceRecordTotalCosts.reduce(
        (total, maintenanceRecord) => {
          return total + maintenanceRecord;
        }
      );
      return userMaintenanceRecordsTotal;
    } else {
      return 0;
    }
  }

  // Console Logs:
  console.log("Vehicles", vehicles);
  console.log("Fillups", fillups);
  console.log("Fillups Total", findTotalCostofGas());
  console.log("Maintenance Records", maintenanceRecords);
  console.log("Maintenance Records Total", findTotalCostofMaintenace());

  return (
    <div className="container">
      <h1>Home Page for {user.username}!</h1>
      {vehicles && (
        <div>
          <h3>Here is your collective vehicle information.</h3>
          <p>Total Spent on Gas = {findTotalCostofGas()}</p>
          <p>Total Spent on Maintenance = {findTotalCostofMaintenace()}</p>
          {/* <p>Total Gallons of Gas Bought = {userFillupsTotal}</p> */}
          {/* <p>Total Miles Driven = {userFillupsTotal}</p> */}
          {/* <p>Average Spent Per Gallon of Gas = {userFillupsTotal}</p> */}
          {/* <p>Average Cost Per Mile Driven = {userFillupsTotal}</p> */}
          {vehicles.map((vehicle) => (
            <p key={vehicle.id}>
              {`${vehicle.year} ${vehicle.make} ${vehicle.model}`}

              {console.log("Model", vehicle.model)}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;

{
  /* {cars &&
cars.map((car) => (
  <p key={car.id}>
  {car.year} {car.model} {car.make}
  </p>
))} */
}
