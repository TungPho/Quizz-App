/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";
import PropTypes from "prop-types";
import io from "socket.io-client";
const s = io(`ws://localhost:3000`);
export const QuizzContext = createContext();
const ContextProvider = (props) => {
  // role, token  and userID
  const [role, setRole] = useState("");
  const [state, setState] = useState("normal");
  const [socket, setSocket] = useState(s);
  const BACK_END_LOCAL_URL = import.meta.env.VITE_LOCAL_API_CALL_URL;
  const [collapsed, setCollapsed] = useState(false);

  const value = {
    role,
    setRole,
    setState,
    state,
    socket,
    setSocket,
    collapsed,
    setCollapsed,
    BACK_END_LOCAL_URL,
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
