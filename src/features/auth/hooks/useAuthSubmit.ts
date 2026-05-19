import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { useState } from "react";
import { AuthFn, LoginData, SignupData } from "../../../shared/services/api";

export function useAuthSubmit(
  apiFn: AuthFn,
  errorMessage: string,
  redirectTo = "/donations",
) {
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginData | SignupData) => {
    try {
      setIsLoading(true);
      const { token, user } = await apiFn(data);
      login(token, user);
      navigate(redirectTo, { replace: true });
    } catch {
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return { onSubmit, isLoading };
}
