import { useForm } from "react-hook-form";
import { AuthFormField } from "../features/auth";
import { AuthFormInput } from "../features/auth";
import { AuthFormErrorMessage } from "../features/auth";
import { signupApi } from "../shared/services/api";
import { AuthForm } from "../features/auth";
import { useAuthSubmit } from "../features/auth";

interface FormValues {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export default function SignupPage() {
  const { onSubmit, isLoading } = useAuthSubmit(
    signupApi,
    "Something went wrong",
  );
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const password = watch("password");

  return (
    <>
      <title>Sign up - Donathell</title>
      <main className="mx-auto flex min-h-[calc(100dvh-4rem)] w-full max-w-lg items-center justify-center px-4 py-8 text-donathell-secondary sm:py-12">
        <AuthForm
          onSubmit={handleSubmit(onSubmit)}
          type="signup"
          isLoading={isLoading}
        >
          <AuthFormField label="Username" htmlFor="username">
            <AuthFormInput
              id="username"
              type="text"
              {...register("username", {
                required: "Username is required",
              })}
            />
            {errors.username && (
              <AuthFormErrorMessage message={errors.username.message!} />
            )}
          </AuthFormField>
          <AuthFormField label="Email" htmlFor="email">
            <AuthFormInput
              id="email"
              type="text"
              {...register("email", {
                required: "Email is required",
              })}
            />
            {errors.email && (
              <AuthFormErrorMessage message={errors.email.message!} />
            )}
          </AuthFormField>
          <AuthFormField label="Password" htmlFor="password">
            <AuthFormInput
              id="password"
              isPassword
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d).+$/,
                  message:
                    "Password must contain at least one letter and one number",
                },
              })}
            />
            {errors.password && (
              <AuthFormErrorMessage message={errors.password.message!} />
            )}
          </AuthFormField>
          <AuthFormField label="Confirm password" htmlFor="passwordConfirm">
            <AuthFormInput
              id="passwordConfirm"
              isPassword
              {...register("passwordConfirm", {
                required: "Confirm password is required",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
            />
            {errors.passwordConfirm && (
              <AuthFormErrorMessage message={errors.passwordConfirm.message!} />
            )}
          </AuthFormField>
        </AuthForm>
      </main>
    </>
  );
}
