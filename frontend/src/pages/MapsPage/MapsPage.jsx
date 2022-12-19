import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import GasStationMap from "../../components/GasStationMap/GasStationMap";
import MaintenanceShopMap from "../../components/MaintenanceShopMap/MaintenanceShopMap";
import PrivateRoute from "../../utils/PrivateRoute";
import "./MapsPage.css";

const MapsPage = ({}) => {
// State Variables:
    const [address, setAddress] = useState("");
    const [coordinates, setCoordinates] = useState({
      lat: 43.0516505,
      lng: -91.1412404,
    });

  return (
    <div className="maps-style">
      <Routes>
        <Route
          path="/gas"
          element={
            <PrivateRoute>
              <GasStationMap address={address} setAddress={setAddress} coordinates={coordinates} setCoordinates={setCoordinates} />
            </PrivateRoute>
          }
        />
        <Route
          path="/maintenance"
          element={
            <PrivateRoute>
              <MaintenanceShopMap address={address} setAddress={setAddress} coordinates={coordinates} setCoordinates={setCoordinates} />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default MapsPage;
