import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authslice";
import { Button, Logo, Input } from "./index";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import authservice from "../appwrite/auth";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const login = async (data) => {
    setError("");
    try {
      const session = await authservice.login(data);
      if (session) {
        const user = await authservice.getCurrentUser();
        if (user) {
          dispatch(authLogin(user));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-200 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transistion-all duration-200 hover:underline hover:text-blue-600"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-500 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be valid",
                },
              })}
            />
            <Input
              label="Password: "
              placeholder="Enter your password"
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: true,
              })}
            >
              <span onClick={() => setShowPassword((prev) => !prev)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </Input>
            <Button
              className="font-medium text-2xl text-primary transistion-all duration-200 hover:underline  hover:text-yellow-400"
              type="submit"
            >
              Sign In
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
