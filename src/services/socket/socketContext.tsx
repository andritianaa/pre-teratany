import React from "react";
import io, { Socket } from "socket.io-client";

type SocketContextType = {
  socket: Socket | null;
};

const SocketContext = React.createContext<SocketContextType>({
  socket: io("http://localhost:9900"),
});

export default SocketContext;
