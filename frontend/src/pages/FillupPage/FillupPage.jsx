import { useNavigate } from "react-router-dom";
import CreateFillupForm from "../../components/forms/FillupForms/CreateFillupForm/CreateFillupForm";
import useAuth from "../../hooks/useAuth";

const FillupPage = ({
  setShowModal,
  setModalForm,
  setModalFormTitle,
  activeVehicle,
  vehicleFillups,
}) => {
  // State Variables:
  const [user, token] = useAuth();

  // Variables:
  const navigate = useNavigate();

  // Handlers:
  const handleAddFillup = () => {
    setShowModal(true);
    setModalFormTitle(`Add Fill-up Record for ${activeVehicle.name}`);
    navigate("/vehicle/fillup");
    setModalForm(
      <CreateFillupForm
        setShowModal={setShowModal}
        activeVehicle={activeVehicle}
        vehicleFillups={vehicleFillups}
      />
    );
  };

  return (
    <div>
      Hello World
      <button onClick={handleAddFillup}>Add Fill-up Record</button>
    </div>
  );
};

export default FillupPage;
