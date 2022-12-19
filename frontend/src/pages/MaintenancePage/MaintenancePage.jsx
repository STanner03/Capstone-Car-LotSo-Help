import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateMaintenanceForm from "../../components/forms/MaintenanceForms/CreateMaintenanceForm/CreateMaintenanceForm";
import MaintenanceRecord from "../../components/MaintenanceRecord/MaintenanceRecord";

const MaintenancePage = ({
  setShowModal,
  setModalForm,
  setModalFormTitle,
  activeVehicle,
  vehicleMaintenance,
}) => {
  // State Variables:
  const [lastServiceMi, setLastServiceMi] = useState(0);
  const [avgServiceCost, setAvgServiceCost] = useState(0);
  const [totalServiceCost, setTotalServiceCost] = useState(0);

  // Variables:
  const navigate = useNavigate();

  // Functions:
  useEffect(() => {
    function findVehicleInfo() {
      if (vehicleMaintenance.length > 0) {
        const tempMilesArray = vehicleMaintenance?.map((service, i) => {
          return service.odometer;
        });
        const findMaxMiles = () => {
          let a;
          let max = tempMilesArray[0];
          for (a = 1; a < tempMilesArray.length; a++) {
            if (tempMilesArray[a] > max) max = tempMilesArray[a];
          }
          return max;
        };
        setLastServiceMi(activeVehicle.odometer - findMaxMiles());
        const tempCostArray = vehicleMaintenance?.map((service, i) => {
          return service.total_cost;
        });
        const totalCostSum = tempCostArray?.reduce((total, element) => {
          return total + element;
        });
        setAvgServiceCost(
          (totalCostSum / vehicleMaintenance.length).toFixed(2)
        );
        setTotalServiceCost(totalCostSum.toFixed(2));
      }
    }
    findVehicleInfo();
  }, [activeVehicle, vehicleMaintenance]);

  // Handlers:
  const handleOK = () => {
    setShowModal(false);
  };

  const handleAddService = () => {
    if (activeVehicle.active === true) {
      setShowModal(true);
      setModalFormTitle(`Add Maintenance Record for ${activeVehicle.name}`);
      navigate("/vehicle/maintenance");
      setModalForm(
        <CreateMaintenanceForm
          setShowModal={setShowModal}
          activeVehicle={activeVehicle}
        />
      );
    } else {
      setShowModal(true);
      setModalFormTitle("Invalid Selection");
      setModalForm(
        <div>
          <div>
            {activeVehicle.name} is not an active vehicle, select or create an
            active vehicle.
          </div>
          <button onClick={handleOK}>OK</button>
        </div>
      );
    }
  };

  const handleOpenMap = () => {
    navigate("/maps/maintenance")
  }

  return (
    <div>
      <div>
        <p>Miles Since last Service {lastServiceMi} mi</p>
        <p>Average Service Cost ${avgServiceCost} </p>
        <p>Total Spent on Maintenance ${totalServiceCost}</p>
        <button onClick={handleAddService}>
          Add Maintenance Service Record
        </button>
        <button onClick={handleOpenMap}>Open Map to See Local Shops</button>
      </div>
      <div>
        {vehicleMaintenance?.map((maintenance, i) => (
          <MaintenanceRecord
            key={i}
            i={i + 1}
            maintenance={maintenance}
            setShowModal={setShowModal}
            setModalForm={setModalForm}
            setModalFormTitle={setModalFormTitle}
            activeVehicle={activeVehicle}
          />
        ))}
      </div>
    </div>
  );
};

export default MaintenancePage;
