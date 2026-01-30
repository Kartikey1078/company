import Modal from "./Modal.jsx";

const ConfirmDialog = ({
  isOpen,
  title,
  message,
  confirmLabel = "Confirm",
  onCancel,
  onConfirm,
  isLoading
}) => {
  return (
    <Modal
      isOpen={isOpen}
      title={title}
      onClose={onCancel}
      footer={
        <div className="modal-actions">
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : confirmLabel}
          </button>
        </div>
      }
    >
      <p className="muted">{message}</p>
    </Modal>
  );
};

export default ConfirmDialog;
