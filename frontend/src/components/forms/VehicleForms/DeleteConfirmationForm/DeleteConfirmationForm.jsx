// Imports:
import axios from "axios";
import useAuth from "../../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const DeleteConfirmationForm = ({ setShowModal, activeVehicle }) => {
  // State Variables:
  const [user, token] = useAuth();

  // Variables:
  const navigate = useNavigate();

  // ASYNC Functions:
  async function deleteVehicle() {
    try {
      let response = await axios.delete(
        `http://127.0.0.1:8000/api/vehicle/${activeVehicle.id}/update/`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      navigate("/");
    } catch (error) {
      console.log(error, "Unable to DELETE Vehicle");
    }
  }

  // Handlers:
  const handleAbort = () => {
    setShowModal(false);
  };
  const handleDelete = () => {
    setShowModal(false);
    deleteVehicle();
  };

  return (
    <form action="delete">
      <p>
        Are you SURE you want to permanantly DELETE "{activeVehicle.name}" from
        your garage?
      </p>
      <button onClick={handleAbort}>Abort</button>
      <button onClick={handleDelete}>DELETE</button>
    </form>
  );
};

export default DeleteConfirmationForm;
