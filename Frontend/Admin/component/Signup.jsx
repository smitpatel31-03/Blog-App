import React, { useState } from "react";
import authServices from "../src/services/auth.js";
import { Link, useNavigate } from "react-router-dom";
import { login as authlogin } from "../src/store/authSlice.js";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const create = async (data) => {
    setError("");
    try {
      const session = await authServices.registerAdmin({ ...data });
      if (session) {
        const adminData = await authServices.getCurruntAdmin();
        if (adminData) {
          dispatch(authlogin(adminData));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message || "Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-900 px-4">
      <div className="mx-auto w-full max-w-md bg-zinc-800 text-white rounded-xl p-8 border border-zinc-700 shadow-lg">
        <h2 className="text-center text-2xl font-bold leading-tight mb-2">
          Sign up to create an account
        </h2>
        <p className="text-center text-sm text-zinc-400 mb-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-blue-400 hover:text-blue-300 hover:underline transition"
          >
            Sign In
          </Link>
        </p>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit(create)} className="space-y-5">
          <div>
            <input
              placeholder="Enter Your Full Name"
              className={`w-full bg-zinc-700 text-white border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.name ? "border-red-500" : "border-zinc-600"
              }`}
              {...register("name", { required: "Full name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <input
              type="email"
              placeholder="Enter Your Email"
              className={`w-full bg-zinc-700 text-white border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? "border-red-500" : "border-zinc-600"
              }`}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="Enter Your Password"
              className={`w-full bg-zinc-700 text-white border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.password ? "border-red-500" : "border-zinc-600"
              }`}
              {...register("password", {
                required: "Password is required",
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg font-semibold transition"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
