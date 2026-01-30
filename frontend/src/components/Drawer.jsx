import { useEffect } from "react";
import { X } from "lucide-react";

const Drawer = ({ isOpen, title, onClose, children, footer }) => {
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
    <div className="drawer-overlay" role="dialog" aria-modal="true">
      <div className="drawer">
        <header className="drawer-header">
          <div>
            <h3>{title}</h3>
            <p className="muted">Fill in details to keep the catalog clean.</p>
          </div>
          <button
            type="button"
            className="btn btn-ghost icon-btn"
            onClick={onClose}
            aria-label="Close drawer"
          >
            <X size={16} />
          </button>
        </header>
        <div className="drawer-body">{children}</div>
        {footer && <div className="drawer-footer">{footer}</div>}
      </div>
      <button
        type="button"
        className="drawer-backdrop"
        onClick={onClose}
        aria-label="Close drawer"
      />
    </div>
  );
};

export default Drawer;
