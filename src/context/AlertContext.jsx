import { createContext, useState } from "react";

export const alertContext = createContext();

const AlertState = (props) => {
  const [showalert, setShowalert] = useState({
    alert: false,
    info: { level: "", errors: "" },
  });
  const [showloading, setShowloading] = useState(false);

  return (
    <alertContext.Provider value={{ showalert, setShowalert, showloading, setShowloading }}>
      {props.children}
    </alertContext.Provider>
  );
};

export default AlertState;
