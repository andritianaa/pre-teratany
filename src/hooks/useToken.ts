import { useAppSelector } from "../store/hooks";

type GetTokenType = string;

function useToken(): GetTokenType {
  const token = useAppSelector((state) => state.teratany_user.token as string);

  return token;
}

export default useToken;
