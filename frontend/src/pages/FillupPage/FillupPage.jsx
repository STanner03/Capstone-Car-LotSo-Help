import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FillupRecord from "../../components/FillupRecord/FillupRecord";
import CreateFillupForm from "../../components/forms/FillupForms/CreateFillupForm/CreateFillupForm";

const FillupPage = ({
  setShowModal,
  setModalForm,
  setModalFormTitle,
  activeVehicle,
  vehicleFillups,
}) => {
  // State Variables:
  const [vehicleMPG, setVehicleMPG] = useState(0);
  const [aveMiPerFillup, setAveMiPerFillup] = useState(0);
  const [aveGalPerFillup, setAveGalPerFillup] = useState(0);
  const [aveCostPerFillup, setAveCostPerFillup] = useState(0.0);
  const [totalCost, setTotalCost] = useState(0.0);

  // Variables:
  const navigate = useNavigate();

  // Functions:
  useEffect(() => {
    function findVehicleInfo() {
      if (vehicleFillups.length > 0) {
        const tempMiles = vehicleFillups?.map((fillup, i) => {
          return fillup.odometer - fillup.prev_odometer;
        });
        const tempGallons = vehicleFillups?.map((fillup, i) => {
          return fillup.fuel_volume;
        });
        const tempTotalCost = vehicleFillups?.map((fillup, i) => {
          return fillup.total_cost;
        });
        const tempMilesSum = tempMiles?.reduce((total, element) => {
          return total + element;
        });
        const tempGallonsSum = tempGallons?.reduce((total, element) => {
          return total + element;
        });
        const tempTotalCostSum = tempTotalCost?.reduce((total, element) => {
          return total + element;
        });
        setVehicleMPG((tempMilesSum / tempGallonsSum).toFixed(3));
        setAveMiPerFillup((tempMilesSum / vehicleFillups.length).toFixed(2));
        setAveGalPerFillup((tempGallonsSum / vehicleFillups.length).toFixed(2));
        setAveCostPerFillup(
          (tempTotalCostSum / vehicleFillups.length).toFixed(2)
        );
        setTotalCost(tempTotalCostSum.toFixed(2));
      }
    }
    findVehicleInfo();
  }, [activeVehicle, vehicleFillups]);

  // Handlers:
  const handleOK = () => {
    setShowModal(false);
  };
  const handleAddFillup = () => {
    if (activeVehicle.active === true) {
      setShowModal(true);
      setModalFormTitle(`Add Fill-up Record for ${activeVehicle.name}`);
      navigate("/vehicle/fillup");
      setModalForm(
        <CreateFillupForm
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

  const handleOpenGasMap = () => {
    navigate("/maps/gas");
  };

  return (
    <div>
      <div>
        <p>Average Miles per Gallon: {vehicleMPG}</p>
        <p>Average Miles per Fill-up: {aveMiPerFillup}</p>
        <p>Average Gallons per Fill-up: {aveGalPerFillup}</p>
        <p>Average Cost per Fill-up: ${aveCostPerFillup}</p>
        <p>Total Amount Spent on Fuel: ${totalCost}</p>
        <button onClick={handleAddFillup}>Add Fill-up Record</button>
        <button onClick={handleOpenGasMap}>
          Open Map to See Gas Stations Nearby
        </button>
      </div>
      <div>
        {vehicleFillups?.map((fillup, i) => (
          <FillupRecord
            key={i}
            i={i + 1}
            fillup={fillup}
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

export default FillupPage;
