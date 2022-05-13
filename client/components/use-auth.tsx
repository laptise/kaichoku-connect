import { JWTPayload } from "@entities";
import { useContext, useEffect } from "react";
import { AuthContext } from "../pages/_app";

const useAuth = (payload?: JWTPayload) => {
  const [auth, setAuth] = useContext(AuthContext).authState;
  useEffect(() => {
    const validUserId = auth?.userId;
    const validPayload = payload?.userId;
    if (validPayload && validUserId != validPayload) {
      setAuth(payload);
    } else if (payload === null) {
      setAuth(null);
    }
  });
  return auth || null;
};

export default useAuth;
