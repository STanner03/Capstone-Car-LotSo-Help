import { useState } from "react";
import ArrowDropDownTwoToneIcon from "@mui/icons-material/ArrowDropDownTwoTone";
import ArrowDropUpTwoToneIcon from "@mui/icons-material/ArrowDropUpTwoTone";
import DeleteForeverTwoToneIcon from "@mui/icons-material/DeleteForeverTwoTone";
import VehicleList from "./VehicleList/VehicleList.jsx";
import "./DropdownMenu.css";

const DropdownMenu = ({ vehicles, setActiveVehicle }) => {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleAddVehicle = () => {};

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
              vehicles={vehicles}
              setActiveVehicle={setActiveVehicle}
            />
          </div>
          <div>
            {/* <div >{
              activeVehicle.name
              }</div> */}
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
