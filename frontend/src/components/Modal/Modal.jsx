import "./Modal.css";

const Modal = ({ show, title, onClose, children }) => {
  const handleClose = (e) => {
    e.stopPropagation();
    onClose();
  };

  return show ? (
    <div className="modal-bg">
      <div className="modal">
        <div className="modal-header">
          <div className="modal-title">{title}</div>
          <span className="modal-close-btn" onClick={handleClose}>
            X
          </span>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  ) : null;
};

export default Modal;
