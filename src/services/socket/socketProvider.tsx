import React, { ReactNode } from "react";
import io from "socket.io-client";
import SocketContext from "./socketContext";

interface SocketContextProps {
  children: ReactNode;
}

const SocketProvider: React.FC<SocketContextProps> = ({ children }) => {
  return (
    <SocketContext.Provider
      value={{ socket: io(process.env.REACT_APP_BASE_URL!) }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
