import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface IMessage {
  _id: string;
  sender: IProfile;
  text: string;
  images?: Array<string>;
  audio?: string;
  conversation: number;
  date?: Date;
}

export interface IConversation {
  _id: string;
  ownerId: string;
  reference: number;
  participants: Array<IProfile>;
  messages: Array<IMessage>;
  overview: string;
  lastMessageDate: Date;
  newMessageCount: number;
  mode: string; //duo ou group ou canal
  admins: Array<string>;
  owner: string;
}

export interface IProfile {
  _id: string;
  name: string;
  image: string;
  categories: string;
  profileType: string;
  role: number;
}

export interface chatInitialState {
  discussions: any;
  activeDiscussionReference: number;
  loading: boolean;
  error: string;
  conversationType: string;
}

const initialState: chatInitialState = {
  discussions: [],
  loading: false,
  error: "",
  activeDiscussionReference: 0,
  conversationType: "duo"
};

export const chatSlice = createSlice({
  name: "teratany_chat",
  initialState,
  reducers: {
    syncChat: (state, action: PayloadAction<any>) => {
      // state.discussions = action.payload
      state.discussions = action.payload;
      for (let i = 0; i < state.discussions.length; i++) {
        console.log(state.discussions[i]);
        state.discussions[i].messages = state.discussions[i]?.messages.sort(
          (a: any, b: any) => a.date - b.date
        );
      }
    },
    openDiscussion: (state, action: PayloadAction<number>) => {
      state.activeDiscussionReference = action.payload;
    },
    switchConversationType: (state, action: PayloadAction<string>) => {
      state.conversationType = action.payload;
    },
  },
});

export const { syncChat, openDiscussion, switchConversationType } = chatSlice.actions;
export default chatSlice.reducer;
