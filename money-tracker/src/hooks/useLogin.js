import { useState, useEffect } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setError(null);
    setIsPending(true);

    try {
      // sign the user in with email & password
      const res = await projectAuth.signInWithEmailAndPassword(email, password);

      // dispatch a login action
      dispatch({ action: "LOGIN", payload: res.user });

      // update the state
      if (!isCancelled) {
        setError(null);
        setIsPending(false);
      }
    } catch (err) {
      if (!isCancelled) {
        console.log(err.message);
        setError(err.message);
        setIsPending(false);
      }
    }
  };
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);
  return { login, isPending, error };
};
