import api from "api/api";

const URLS = {
    crudPublication: '/publication',
    getPublicationByProfile: '/publication/byProfile',
    getOnePublication: '/publication/one',
    getPublicationDetails: '/publication/one',
    toggleReactPublication: '/publication/reaction/toggle',
}


export const getPublicationByProfile = (token: string, profileId: string, ownId: string) => {
    return api.get(`${URLS.getPublicationByProfile}/?profileId=${profileId}&ownId=${ownId}`, {
        headers: {
            'Authorization': token
        }
    })
}
export const getOnePublication = (token: string, publicationId: string, ownId: string) => {

    console.log(publicationId, ownId)

    return api.get(`${URLS.getOnePublication}/?publicationId=${publicationId}&ownId=${ownId}`, {
        headers: {
            'Authorization': token
        }
    })
}

export const postPublication = (token: string, profile: string, content: string, images?: any) => {
    return api.post(URLS.crudPublication, { profile, content, images }, {
        headers: {
            'Authorization': token
        }
    })
}


export const toggleReactPublication = (token: string, profileId: string, publicationId: string) => {


    return api.post(URLS.toggleReactPublication, { profileId, publicationId }, {
        headers: {
            'Authorization': token
        }
    })
}


export const editPublication = (token: string, publicationId: string, content: string) => {
    return api.patch(URLS.crudPublication, { publicationId, content }, {
        headers: {
            'Authorization': token
        }
    })
}
export const deletePublication = (token: string, publicationId: string) => {
    return api.delete(`${URLS.crudPublication}/${publicationId}`, {
        headers: {
            'Authorization': token
        }
    })
}
