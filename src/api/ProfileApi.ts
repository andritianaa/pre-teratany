import api from "api/api";

const URLS = {
    getByToken: '/profile/byToken',
    getById: '/profile',
    updateGeneralInfo: '/profile/general',
    updateProfileImage: "/profile/image",
    updateUserPassword: "/profile/password",
    updateCoordonates: "/profile/localisation",
    updateCategory: "/profile/categories",
    followProfile: "/profile/follow",
    searchProfile: "/profile",
    passwordRecovery: "/profile/password/recovery",
    followedProfile: "/profile/follow/list",
    profileWithCoordonates: "/profile/withCoordonates",

}


export const getProfileWithCoordonates = (token: string) => {
    return api.get(`${URLS.profileWithCoordonates}`, {
        headers: { 'Authorization': token }
    })
}

export const getFollowedProfile = (token: string, id: string | undefined) => {
    return api.get(`${URLS.followedProfile}/${id}`, {
        headers: { 'Authorization': token }
    })
}
export const sendEmailRecovery = (email: string | undefined) => {
    return api.get(`${URLS.passwordRecovery}/?email=${email}`)
}

export const searchProfile = (token: string, filter: string | undefined, ownId: string | undefined, type?: string) => {
    if (type === undefined) {
        type = ""
    }
    return api.get(`${URLS.searchProfile}/?filter=${filter}&ownId=${ownId}&type=${type}`, {
        headers: { 'Authorization': token }
    })
}
export const getById = (token: string, id: string | undefined, ownId: string | undefined) => {

    return api.get(`${URLS.getById}/${id}/${ownId}`, {
        headers: { 'Authorization': token }
    })
}
export const getUserByToken = (token: string) => {
    return api.get(URLS.getByToken, {
        headers: { 'Authorization': token }
    })
}


export const followProfile = (token: string, currentProfileId: string | undefined, toFollowId: string | undefined) => {

    return api.post(URLS.followProfile, { currentProfileId, toFollowId }, {
        headers: { 'Authorization': token }
    })
}

export const updateGeneralInfo = (token: string, id: string | undefined, name: string | undefined, email: string | undefined, description?: string | undefined) => {
    return api.patch(URLS.updateGeneralInfo, { id, name, email, description }, {
        headers: { 'Authorization': token }
    })
}

export const updateProfileImage = (token: string, id: string | undefined, imageUrl: any) => {
    return api.patch(URLS.updateProfileImage, { id, image: imageUrl[0] }, {
        headers: { 'Authorization': token }
    })
}

export const updatePassword = (token: string, password: string, newPassword: string) => {
    return api.patch(URLS.updateUserPassword, { password, newPassword }, {
        headers: { 'Authorization': token }
    })
}

export const updateCategory = (token: string, id: string | undefined, categories: string | undefined) => {
    return api.patch(URLS.updateCategory, { id, categories }, {
        headers: { 'Authorization': token }
    })
}

export const updateLocationParameter = (token: string, id: string | undefined, latitude: number, longitude: number, isPublic: boolean) => {
    return api.patch(URLS.updateCoordonates,
        {
            id,
            coordonates: {
                latitude,
                longitude,
                isPublic
            }
        }, {
        headers: { 'Authorization': token }
    })
}

export const resetPassword = (email: string | undefined, password: string | undefined, code: string | undefined) => {
    return api.patch(`${URLS.passwordRecovery}`, {
        email, password, code
    })
}

