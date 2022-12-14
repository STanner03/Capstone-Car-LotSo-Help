import { useState } from "react";
import ArrowDropDownTwoToneIcon from "@mui/icons-material/ArrowDropDownTwoTone";
import ArrowDropUpTwoToneIcon from "@mui/icons-material/ArrowDropUpTwoTone";
import VehicleList from "./VehicleList/VehicleList.jsx";
import "./DropdownMenu.css";
import AddVehicleForm from "../forms/VehicleForms/AddVehicleForm/AddVehicleForm.jsx";

const DropdownMenu = ({
  vehicles,
  setShowModal,
  setModalForm,
  setActiveVehicle,
  setModalFormTitle,
}) => {
  // State Variables:
  const [open, setOpen] = useState(false);

  // Handlers:
  const handleOpen = () => {
    setOpen(!open);
  };

  const handleAddVehicle = () => {
    handleOpen();
    setShowModal(true);
    setModalFormTitle("Add a New Vehicle to Your Garage.");
    setModalForm(<AddVehicleForm setShowModal={setShowModal} />);
  };

  return (
    <div className="drp-dn-menu">
      <div className="btn-stl" onClick={handleOpen}>
        Add/Select Vehicle
        {open ? <ArrowDropUpTwoToneIcon /> : <ArrowDropDownTwoToneIcon />}
      </div>
      {open ? (
        <div className="sel-col">
          <div>
            <VehicleList
              handleOpen={handleOpen}
              vehicles={vehicles}
              setActiveVehicle={setActiveVehicle}
            />
          </div>
          <div>
            <button className="btn-stl" onClick={handleAddVehicle}>
              Add New Vehicle
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default DropdownMenu;
