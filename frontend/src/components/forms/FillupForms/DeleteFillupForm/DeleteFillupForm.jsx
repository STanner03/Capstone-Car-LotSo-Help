// Imports:
import axios from "axios";
import useAuth from "../../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const DeleteFillupForm = ({ fillup, setShowModal, activeVehicle }) => {
  // State Variables:
  const [user, token] = useAuth();

  // Variables:
  const navigate = useNavigate();

  // ASYNC Functions:
  async function deleteFillup() {
    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/vehicle/${activeVehicle.id}/fillup/${fillup.id}/update/`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      navigate("/vehicle");
    } catch (error) {
      console.log(error, "Unable to Delete Record");
    }
  }

  // Functions:
  function handleDelete() {
    deleteFillup();
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

export default DeleteFillupForm;
