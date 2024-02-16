/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { withAsync } from "../helpers/withAsync";
import { getUserByToken } from "../api/ProfileApi";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { IProfile } from "../types/profile.type";
import useToken from "./useToken";




const useFetchUserByToken = () => {
    const [user, setUser] = useState<IProfile>();
    const token = useToken()

    useEffect(() => {


        async function fetchUser() {
            if (token) {
                const { error, response } = await withAsync(() => getUserByToken(token));
                if (error instanceof AxiosError) {
                    console.log(error)
                    const error_message: string = error?.response?.data?.error?.description || error?.response?.data || error.message;
                    toast.error(error_message);
                } else {
                    setUser(response?.data as IProfile);
                }
            }
        }
        fetchUser()

    }, [])


    return user;

}

export default useFetchUserByToken