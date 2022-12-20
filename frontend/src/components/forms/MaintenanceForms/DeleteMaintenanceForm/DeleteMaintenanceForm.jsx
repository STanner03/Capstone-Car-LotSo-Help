// Imports:
import axios from "axios";
import useAuth from "../../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const DeleteMaintenanceForm = ({
  maintenance,
  setShowModal,
  activeVehicle,
}) => {
  // State Variables:
  const [user, token] = useAuth();

  // Variables:
  const navigate = useNavigate();

  // ASYNC Functions:
  async function deleteService() {
    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/vehicle/${activeVehicle.id}/maintenance/${maintenance.id}/update/`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      navigate("/");
    } catch (error) {
      console.log(error, "Unable to Delete Record");
    }
  }

  // Functions:
  function handleDelete() {
    deleteService();
    setShowModal(false);
  }
  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <div className="form-style">
      <div>Are you sure you want to DELETE this record FOREVER?</div>
      <div>
        <button className="cncl-btn" onClick={handleCancel}>
          Cancel
        </button>
        <button onClick={handleDelete}>Confirm</button>
      </div>
    </div>
  );
};

export default DeleteMaintenanceForm;
