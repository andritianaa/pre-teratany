import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { syncChat as syncChatRequest } from "../../api/chatApi"
import { withAsync } from "../../helpers/withAsync"
import { ErrorData, ThrowErrorHandler } from "../../helpers/HandleError"
import { IHistory } from "../../types/historique.type"
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
    discussions: any
    activeDiscussionReference: number
    loading: boolean
    error: string
}

const initialState: chatInitialState = {
    discussions: [],
    loading: false,
    error: "",
    activeDiscussionReference: 0,
}

interface ChatSyncProperty {
    profileId: string,
    conversationReferences: number[],
    fromDate: Date | undefined
}



export const chatSlice = createSlice({
    name: "teratany_chat",
    initialState,
    reducers: {
        syncChat: (state, action: PayloadAction<any>) => {
            // state.discussions = action.payload
            state.discussions = action.payload

            for (let i = 0; i < state.discussions.length; i++) {
                console.log(state.discussions[i]);
                state.discussions[i].messages = state.discussions[i]?.messages.sort((a: any, b: any) => a.date - b.date);
            }
        },
        openDiscussion: (state, action: PayloadAction<number>) => {
            state.activeDiscussionReference = action.payload
        }
    }
})

export const { syncChat, openDiscussion } = chatSlice.actions;
export default chatSlice.reducer;