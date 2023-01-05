import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import CostLineChart from "../../components/CostLineChart/CostLineChart.jsx";
import "./HomePage.css";

const HomePage = ({ vehicles, setVehicles, activeVehicle }) => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  //TODO: Add an AddCars Page to add a car for a logged in user's garage

  // State Variables:
  const [user, token] = useAuth();
  const [activatedVehicles, setActivatedVehicles] = useState([]);
  const [fillups, setFillups] = useState([]);
  const [maintenanceRecords, setMaintenanceRecords] = useState([]);
  const [totalCostofGas, setTotalCostofGas] = useState(0.0);
  const [totalCostofMaintenance, setTotalCostofMaintenance] = useState(0.0);
  const [gasVolumeTotal, setGasVolumeTotal] = useState(0.0);
  const [avgPerGalCost, setAvgPerGalCost] = useState(0.0);
  const [totalMiles, setTotalMiles] = useState(0);
  const [avgPerMileCost, setAvgPerMileCost] = useState(0.0);
  const [userMPG, setUserMPG] = useState(0.0);
  const [ownershipCost, setOwnershipCost] = useState(0.0);

  // UseEffects:
  useEffect(() => {
    fetchVehicles();
    fetchFillups();
    fetchMaintenanceRecords();
  }, [user, token, activeVehicle, vehicles.length]);

  useEffect(() => {
    findActiveVehicles();
    getUserInfo();
  }, [fillups, maintenanceRecords]);

  // ASYNC Functions:
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

  // Functions:
  function getUserInfo() {
    if (fillups.length > 0) {
      const tempMiles = fillups?.map((fillup, i) => {
        return fillup.odometer - fillup.prev_odometer;
      });
      const tempGallons = fillups?.map((fillup, i) => {
        return fillup.fuel_volume;
      });
      const tempTotalCost = fillups?.map((fillup, i) => {
        return fillup.total_cost;
      });
      const tempPerGal = fillups?.map((fillup, i) => {
        return fillup.fuel_price_per_gallon;
      });
      const tempMilesSum = tempMiles.reduce((total, element) => {
        return total + element;
      });
      const tempGallonsSum = tempGallons.reduce((total, element) => {
        return total + element;
      });
      const tempTotalCostSum = tempTotalCost.reduce((total, element) => {
        return total + element;
      });
      const tempPerGalSum = tempPerGal.reduce((total, element) => {
        return total + element;
      });
      setUserMPG((tempMilesSum / tempGallonsSum).toFixed(1));
      setTotalCostofGas(tempTotalCostSum.toFixed(2));
      setGasVolumeTotal(tempGallonsSum.toFixed(1));
      setAvgPerGalCost((tempPerGalSum / fillups.length).toFixed(2));
      setTotalMiles(tempMilesSum);
    }
    if (maintenanceRecords.length > 0) {
      const tempTotalCostArray = maintenanceRecords?.map((record, i) => {
        return record.total_cost;
      });
      const tempTotalCostSum = tempTotalCostArray?.reduce((total, element) => {
        return total + element;
      });
      setTotalCostofMaintenance(tempTotalCostSum);
    }
    getsharedInfo();
  }

  function getsharedInfo() {
    if (maintenanceRecords.length > 0 && fillups.length > 0) {
      const tempTotalCostArray = maintenanceRecords?.map((record, i) => {
        return record.total_cost;
      });
      const tempTotalMaintCostSum = tempTotalCostArray?.reduce(
        (total, element) => {
          return total + element;
        }
      );
      const tempTotalCost = fillups?.map((fillup, i) => {
        return fillup.total_cost;
      });
      const tempTotalFUCostSum = tempTotalCost.reduce((total, element) => {
        return total + element;
      });
      const tempMiles = fillups?.map((fillup, i) => {
        return fillup.odometer - fillup.prev_odometer;
      });
      const tempMilesSum = tempMiles.reduce((total, element) => {
        return total + element;
      });
      setOwnershipCost((tempTotalMaintCostSum + tempTotalFUCostSum).toFixed(2));
      setAvgPerMileCost(
        ((tempTotalMaintCostSum + tempTotalFUCostSum) / tempMilesSum).toFixed(2)
      );
    } else if (fillups.length > 0) {
      const tempTotalCost = fillups?.map((fillup, i) => {
        return fillup.total_cost;
      });
      const tempTotalFUCostSum = tempTotalCost.reduce((total, element) => {
        return total + element;
      });
      const tempMiles = fillups?.map((fillup, i) => {
        return fillup.odometer - fillup.prev_odometer;
      });
      const tempMilesSum = tempMiles.reduce((total, element) => {
        return total + element;
      });
      setOwnershipCost(tempTotalFUCostSum.toFixed(2));
      setAvgPerMileCost((tempTotalFUCostSum / tempMilesSum).toFixed(2));
    } else if (maintenanceRecords.length > 0) {
      const tempTotalCostArray = maintenanceRecords?.map((record, i) => {
        return record.total_cost;
      });
      const tempTotalMaintCostSum = tempTotalCostArray?.reduce(
        (total, element) => {
          return total + element;
        }
      );
      const tempMiles = maintenanceRecords?.map((record, i) => {
        return maintenanceRecords.odometer - maintenanceRecords.prev_odometer;
      });
      const tempMilesSum = tempMiles.reduce((total, element) => {
        return total + element;
      });
      setOwnershipCost(tempTotalMaintCostSum.toFixed(2));
      setAvgPerMileCost((tempTotalMaintCostSum / tempMilesSum).toFixed(2));
    }
  }

  const findActiveVehicles = () => {
    let tempActiveVehicles = vehicles.filter((vehicle) => {
      if (vehicle.active === true) {
        return vehicle;
      }
    });
    setActivatedVehicles(tempActiveVehicles);
  };

  return (
    <div>
      {vehicles && (
        <div className="home-style">
          <div className="home-style-bg">
            <h1>{user.first_name}, this is your garage.</h1>
            <h3>Here you will see your overall information.</h3>
            <h3>Active Vehicles in Your Garage:</h3>
            <div className="vehicles">
              {activatedVehicles?.map((vehicle, i) => {
                return (
                  <p key={i}>
                    {`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                  </p>
                );
              })}
            </div>
            <h3>Averages:</h3>
            <p>Average Miles Per Gallon From All Vehicles: {userMPG}mi </p>
            <p>Average Spent Per Gallon of Gas: ${avgPerGalCost}</p>
            <p>Average Cost Per Mile Driven: ${avgPerMileCost}</p>
            <h3>Total Costs:</h3>
            <p>Total Cost of Ownership: ${ownershipCost}</p>
            <h3>Other Totals:</h3>
            <p>Total Gallons of Gas Bought: {gasVolumeTotal} Gallons</p>
            <p>Total Miles Driven: {totalMiles}mi</p>
          </div>
          <div className="cost-chart">
            <div>
              {fillups.length > 0 && (
                <CostLineChart
                  props={fillups}
                  lineData={"Cost per Fill-up"}
                  chartTitle={`Total Spent on Gas: $${totalCostofGas}`}
                  chartSubTitle={"This chart displays each fill-up's cost."}
                />
              )}
            </div>
            <div>
              {maintenanceRecords.length > 0 && (
                <CostLineChart
                  props={maintenanceRecords}
                  lineData={"Cost per Record"}
                  chartTitle={`Total Spent on Maintenance: $${totalCostofMaintenance}`}
                  chartSubTitle={
                    "This chart displays each maintenance record's cost."
                  }
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
