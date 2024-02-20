import api from "api/api";

const URLS = {
    sync: '/chat/sync',
}



export const syncChat = async (profileId: string, conversationReferences: number[], fromDate: Date | undefined) => {

    const discussions = await api.post(URLS.sync, {
        profileId, conversationReferences, fromDate
    })
    return discussions.data
}