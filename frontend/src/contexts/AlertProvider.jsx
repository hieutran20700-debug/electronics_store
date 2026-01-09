import { createContext, useState } from "react";
import Alert from "react-bootstrap/Alert";

export const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    variant: "success",
  });

  const showAlert = (message, variant = "success") => {
    setAlert({ show: true, message, variant });

    setTimeout(() => {
      setAlert((prev) => ({ ...prev, show: false }));
    }, 3000);
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {alert.show && (
        <Alert
          variant={alert.variant}
          className="position-fixed end-0 m-3"
          style={{top: "80px", zIndex: 9999 }}
        >
          {alert.message}
        </Alert>
      )}
      {children}
    </AlertContext.Provider>
  );
};


