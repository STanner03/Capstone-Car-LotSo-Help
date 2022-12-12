import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import DropdownMenu from "../../components/DropdownMenu/DropdownMenu.jsx";
import axios from "axios";

const HomePage = ({ setActiveVehicle }) => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  //TODO: Add an AddCars Page to add a car for a logged in user's garage

  // State Variables
  const [user, token] = useAuth();
  const [vehicles, setVehicles] = useState([]);
  const [fillups, setFillups] = useState([]);

  // Variables
  // const userFillupsTotal = 0
  // const userGasVolumeTotal = 0;
  // const userAvgPerGalCost = 0.0;
  // const userMaintenanceTotal = 0;
  // const userTotalMiles = 0;
  // const userAvgPerMileCost = 0.0;

  // UseEffects

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
  }, [token]);

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
  }, [token]);

  // Functions
  // function findTotalCostofGas() {
  //   const fillupTotalCosts = fillups.map((el, i) => {
  //     return el.total_cost;
  //   });

  //   const userFillupsTotal = fillupTotalCosts.reduce((total, fillup) => {
  //     return total + fillup;
  //   });
  //   return userFillupsTotal;
  // }

  console.log("Vehicles", vehicles);
  // console.log("Fillups", fillups);
  // console.log("Fillups Total", findTotalCostofGas());

  return (
    <div>
      {user && (
        <DropdownMenu vehicles={vehicles} setActiveVehicle={setActiveVehicle} />
      )}
      <div className="container">
        <h1>Home Page for {user.username}!</h1>
        {vehicles && (
          <div>
            <h3>Here is your collective vehicle information.</h3>
            {/* <p>Total Spent on Gas = {findTotalCostofGas()}</p> */}
            {/* <p>Total Spent on Maintenance = {userFillupsTotal}</p>
            <p>Total Gallons of Gas Bought = {userFillupsTotal}</p>
            <p>Total Miles Driven = {userFillupsTotal}</p>
            <p>Average Spent Per Gallon of Gas = {userFillupsTotal}</p>
            <p>Average Cost Per Mile Driven = {userFillupsTotal}</p> */}
            {vehicles.map((vehicle) => (
              <p key={vehicle.id}>
                {`${vehicle.year} ${vehicle.make} ${vehicle.model}`}

                {console.log("Model", vehicle.model)}
              </p>
            ))}
          </div>
        )}
        {/* {cars &&
        cars.map((car) => (
          <p key={car.id}>
          {car.year} {car.model} {car.make}
          </p>
        ))} */}
      </div>
    </div>
  );
};

export default HomePage;
