import { Route, Routes } from "react-router-dom";
import GasStationMap from "../../components/GasStationMap/GasStationMap";
import MaintenanceShopMap from "../../components/MaintenanceShopMap/MaintenanceShopMap";
import PrivateRoute from "../../utils/PrivateRoute";
import "./MapsPage.css";

const MapsPage = ({}) => {
  return (
    <div className="maps-style">
      <Routes>
        <Route
          path="/gas"
          element={
            <PrivateRoute>
              <GasStationMap />
            </PrivateRoute>
          }
        />
        <Route
          path="/maintenance"
          element={
            <PrivateRoute>
              <MaintenanceShopMap />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default MapsPage;
