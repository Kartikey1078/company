import { useEffect } from "react";

const Modal = ({ isOpen, title, onClose, children, footer }) => {
  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const handleKey = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal">
        <header className="modal-header">
          <h3>{title}</h3>
        </header>
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
      <button
        type="button"
        className="modal-backdrop"
        onClick={onClose}
        aria-label="Close dialog"
      />
    </div>
  );
};

export default Modal;
