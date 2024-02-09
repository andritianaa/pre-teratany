import { createSlice } from "@reduxjs/toolkit";
import { io, Socket } from "socket.io-client";

interface SocketInitialState {
  socket: Socket;
}

const initialState: SocketInitialState = {
  socket: io("https://backend.teratany.org").connect(),
};

export const socketIOSlice = createSlice({
  name: "teratany_socket",
  initialState,
  reducers: {},
});

export default socketIOSlice.reducer;
