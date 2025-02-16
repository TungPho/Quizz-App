/* eslint-disable react-refresh/only-export-components */
import { createContext } from "react";
import PropTypes from "prop-types";
export const QuizzContext = createContext();
const ContextProvider = (props) => {
  const value = {};
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
