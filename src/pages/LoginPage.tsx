import { useForm } from "react-hook-form";
import AuthFormField from "../components/form/AuthFormField";
import AuthFormInput from "../components/form/AuthFormInput";
import AuthErrorMessage from "../components/form/AuthFormErrorMessage";
import { loginApi } from "../services/api";
import AuthForm from "../components/form/AuthForm";
import { useAuthSubmit } from "../hooks/useAuthSubmit";

interface FormValues {
  loginIdentifier: string;
  password: string;
}

export default function LoginPage() {
  const { onSubmit, isLoading } = useAuthSubmit(
    loginApi,
    "Invalid credentials",
  );
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValues>();

  return (
    <>
      <title>Log in - Donathell</title>
      <main className="mx-auto flex min-h-[calc(100dvh-4rem)] w-full max-w-lg items-center justify-center px-4 py-8 text-donathell-secondary sm:py-12">
        <AuthForm
          onSubmit={handleSubmit(onSubmit)}
          type="login"
          isLoading={isLoading}
        >
          <AuthFormField label="Username or email" htmlFor="loginIdentifier">
            <AuthFormInput
              id="loginIdentifier"
              type="text"
              {...register("loginIdentifier", {
                required: "Username or email is required",
              })}
            />
            {errors.loginIdentifier && (
              <AuthErrorMessage message={errors.loginIdentifier.message!} />
            )}
          </AuthFormField>
          <AuthFormField label="Password" htmlFor="password">
            <AuthFormInput
              id="password"
              isPassword
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <AuthErrorMessage message={errors.password.message!} />
            )}
          </AuthFormField>
        </AuthForm>
      </main>
    </>
  );
}
