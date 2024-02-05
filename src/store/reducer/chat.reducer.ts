import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface IMessage {
    _id: string,
    sender: IProfile,
    text: string,
    images?: Array<string>,
    audio?: string,
    conversation: number,
    date?: Date
}

export interface IConversation {
    _id: string,
    ownerId: string,
    reference: number,
    participants: Array<IProfile>,
    messages: Array<IMessage>,
    overview: string,
    lastMessageDate: Date,
    newMessageCount: number,
    mode: string //duo ou group
}

export interface IProfile {
    _id: string,
    name: string,
    image: string,
    categories: string,
    profileType: string,
    role: number
}

export interface chatInitialState {
    discussions: Array<IConversation>
}

const initialState: chatInitialState = {
    discussions: []
}

export const chatSlice = createSlice({
    name: "teratany_chat",
    initialState,
    reducers: {
        syncChat: (state, action: PayloadAction<IConversation[]>) => {
            state.discussions = action.payload
        }
    }
})

export const { syncChat } = chatSlice.actions;
export default chatSlice.reducer;