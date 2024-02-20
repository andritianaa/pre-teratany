import React from "react";
import io, { Socket } from "socket.io-client";

type SocketContextType = {
  socket: Socket | null;
};

const SocketContext = React.createContext<SocketContextType>({
  socket: io(process.env.REACT_APP_BASE_URL!),
});

export default SocketContext;