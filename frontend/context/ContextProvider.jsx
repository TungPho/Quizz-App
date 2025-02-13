/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";
import PropTypes from "prop-types";
export const QuizzContext = createContext();
const ContextProvider = (props) => {
  const [createState, setCreateState] = useState("normal");
  const value = {
    createState,
    setCreateState,
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
