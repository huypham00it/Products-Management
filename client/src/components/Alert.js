import { useStateValue } from "../context/StateContext";

const Alert = () => {
  const { alertText, alertType } = useStateValue();
  return <div className={`alert alert-${alertType}`}>{alertText}</div>;
};

export default Alert;
