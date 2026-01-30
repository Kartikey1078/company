import { createContext, useContext, useMemo, useState } from "react";

const ToastContext = createContext(null);

const buildToast = (toast) => ({
  id: crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`,
  type: toast.type || "info",
  title: toast.title || "",
  message: toast.message || "",
  duration: toast.duration ?? 3000
});

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const pushToast = (toast) => {
    const nextToast = buildToast(toast);
    setToasts((prev) => [...prev, nextToast]);
    window.setTimeout(() => removeToast(nextToast.id), nextToast.duration);
  };

  const value = useMemo(
    () => ({
      success: (message, title = "Success") =>
        pushToast({ type: "success", title, message }),
      error: (message, title = "Something went wrong") =>
        pushToast({ type: "error", title, message }),
      info: (message, title = "Notice") =>
        pushToast({ type: "info", title, message })
    }),
    []
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="toasts">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast toast-${toast.type}`}>
            <div>
              <strong>{toast.title}</strong>
              <p>{toast.message}</p>
            </div>
            <button
              type="button"
              className="btn btn-ghost icon-btn"
              onClick={() => removeToast(toast.id)}
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
};
