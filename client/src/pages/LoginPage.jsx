import { useMutation } from "@apollo/client";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

import InputField from "../components/inputField";
import { LOGIN } from "../graphql/mutations/user.mutation";

const LoginPage = () => {
  const [login, { loading }] = useMutation(LOGIN, {
    refetchQueries: ["GetAuthenticatedUser"],
  });
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loading = toast.loading("Logging in...");
    try {
      await login({
        variables: {
          input: loginData,
        },
      });
      toast.success("Login successful");
    } catch (error) {
      toast.error(error.message);
    } finally {
      toast.dismiss(loading);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="z-50 flex overflow-hidden bg-gray-300 rounded-lg">
        <div className="flex items-center justify-center w-full bg-gray-100 min-w-80 sm:min-w-96">
          <div className="w-full max-w-md p-6">
            <h1 className="mb-6 text-3xl font-semibold text-center text-black">
              Login
            </h1>
            <h1 className="mb-6 text-sm font-semibold text-center text-gray-500">
              Welcome back! Log in to your account
            </h1>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <InputField
                label="Username"
                id="username"
                name="username"
                value={loginData.username}
                onChange={handleChange}
              />

              <InputField
                label="Password"
                id="password"
                name="password"
                type="password"
                value={loginData.password}
                onChange={handleChange}
              />
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full p-2 text-white transition-colors duration-300 bg-black rounded-md hover:bg-gray-800 focus:outline-none focus:bg-black focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 disabled:opacity-70 disabled:cursor-not-allowed "
                >
                  {loading ? "Loading..." : "Login"}
                </button>
              </div>
            </form>
            <div className="mt-4 text-sm text-center text-gray-600">
              <p>
                {"Don't"} have an account?{" "}
                <Link to="/register" className="text-black hover:underline">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
