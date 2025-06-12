import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authservice from "../appwrite/auth";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Button, Logo, Input } from "./index";
import { login as authlogiN } from "../store/authslice";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const create = async (data) => {
    setError("");
    try {
      const userrData = await authservice.createAccount(data);
      if (userrData) {
        const user = await authservice.getCurrentUser();
        if (user) {
          dispatch(authlogiN(user));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="flex items-center justify-center">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign up to create account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline  hover:text-blue-600"
          >
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(create)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              {...register("name", {
                required: true,
              })}
            />
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
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            >
              <span onClick={() => setShowPassword((prev) => !prev)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </Input>
            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
