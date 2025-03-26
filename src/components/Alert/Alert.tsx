import { useContext } from "react";
import { AlertContext } from "../../utils/context";
import { Alert, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const AlertContainer = () => {
  const { alerts, removeAlert } = useContext(AlertContext);

  if (!alerts.length) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        zIndex: 1500,
        width: "50%",
      }}
    >
      {alerts.map((alert) => (
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                removeAlert(alert.id);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
          key={alert.id}
          severity={alert.type}
        >
          {alert.message}
        </Alert>
        // <div
        //   key={alert.id}
        //   style={{
        //     padding: "10px",
        //     marginBottom: "10px",
        //     width: "200px",
        //     borderRadius: "4px",
        //     backgroundColor:
        //       alert.type === "success"
        //         ? "#d4edda"
        //         : alert.type === "error"
        //         ? "#f8d7da"
        //         : alert.type === "warning"
        //         ? "#fff3cd"
        //         : "#d1ecf1",
        //     color:
        //       alert.type === "success"
        //         ? "#155724"
        //         : alert.type === "error"
        //         ? "#721c24"
        //         : alert.type === "warning"
        //         ? "#856404"
        //         : "#0c5460",
        //   }}
        // >
        //   {alert.message}
        //   <button
        //     onClick={() => removeAlert(alert.id)}
        //     style={{ marginLeft: "10px", cursor: "pointer" }}
        //   >
        //     &times;
        //   </button>
        // </div>
      ))}
    </div>
  );
};

export default AlertContainer;
