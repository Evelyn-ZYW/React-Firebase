import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { projectAuth } from "../firebase/config";

export const useLogout = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const logout = async () => {
    setError(null);
    setIsPending(true);

    try {
      await projectAuth.signOut();
      dispatch({ type: "LOGOUT" });
      setIsPending(false);
      setError(null);
    } 
    catch (err) {
      console.log(err.message);
      setError(err.message);
      setIsPending(false);
    }
  };
  return { error, isPending, logout };
};
