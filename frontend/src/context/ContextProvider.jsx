/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";
import PropTypes from "prop-types";
export const QuizzContext = createContext();
const ContextProvider = (props) => {
  // role, token  and userID
  const [role, setRole] = useState("");
  const [state, setState] = useState("normal");
  const value = {
    role,
    setRole,
    setState,
    state,
  };
  return (
    <QuizzContext.Provider value={value}>
      {props.children}
    </QuizzContext.Provider>
  );
};
ContextProvider.propTypes = {
  children: PropTypes.any,
};
export default ContextProvider;
