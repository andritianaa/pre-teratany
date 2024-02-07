/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { withAsync } from "helpers/withAsync";
import { searchProfile } from "api/ProfileApi";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import useToken from "hooks/useToken";
import useFetchProfile from "./useFetchProfile";
import { ISearch } from "types/search.type";

const useFetchSearchByQuery = (query: string, type?: string) => {
  const token = useToken();
  const profileConnectedUser = useFetchProfile();
  const [results, setResults] = useState<ISearch>();

  useEffect(() => {
    async function fetchResults() {
      if (profileConnectedUser) {
        const { error, response } = await withAsync(() =>
          searchProfile(token, query, profileConnectedUser?._id!, type)
        );
        if (error instanceof AxiosError) {
          const error_message: string =
            error?.response?.data.description ||
            error?.response?.data ||
            error.message;
          toast.error(error_message);
        } else {

          setResults(response?.data as ISearch);
        }
      }
    } fetchResults()
  }, [profileConnectedUser?._id, query])

  return results!;
}

export default useFetchSearchByQuery;
