import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { toast } from "react-hot-toast";

import InputField from "../components/inputField";
import RadioButton from "../components/radioButton";
import { REGISTER } from "../graphql/mutations/user.mutation";

const RegisterPage = () => {
  const [register, { loading }] = useMutation(REGISTER, {
    refetchQueries: ["GetAuthenticatedUser"],
  });
  const [signUpData, setSignUpData] = useState({
    name: "",
    username: "",
    password: "",
    gender: "",
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "radio") {
      setSignUpData((prevData) => ({
        ...prevData,
        gender: value,
      }));
    } else {
      setSignUpData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loading = toast.loading("Signing up...");
    try {
      await register({
        variables: {
          input: signUpData,
        },
      });
      toast.success("Account created successfully");
    } catch (error) {
      toast.error(error.message);
    } finally {
      toast.dismiss(loading);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="z-50 flex w-full px-5 overflow-hidden rounded-lg">
        <div className="flex items-center justify-center w-full mx-auto rounded-lg bg-gray-100 sm:w-[26rem] 2xl:min-w-[28rem]">
          <div className="w-full max-w-md p-6">
            <h1 className="mb-6 text-3xl font-semibold text-center text-black">
              Sign Up
            </h1>
            <h1 className="mb-6 text-sm font-semibold text-center text-gray-500">
              Join to keep track of your expenses
            </h1>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <InputField
                label="Full Name"
                id="name"
                name="name"
                value={signUpData.name}
                onChange={handleChange}
              />
              <InputField
                label="Username"
                id="username"
                name="username"
                value={signUpData.username}
                onChange={handleChange}
              />

              <InputField
                label="Password"
                id="password"
                name="password"
                type="password"
                value={signUpData.password}
                onChange={handleChange}
              />
              <div className="flex gap-10">
                <RadioButton
                  id="male"
                  label="Male"
                  name="gender"
                  value="male"
                  onChange={handleChange}
                  checked={signUpData.gender === "male"}
                />
                <RadioButton
                  id="female"
                  label="Female"
                  name="gender"
                  value="female"
                  onChange={handleChange}
                  checked={signUpData.gender === "female"}
                />
              </div>

              <div>
                <button
                  disabled={loading}
                  type="submit"
                  className="w-full p-2 text-white transition-colors duration-300 bg-black rounded-md hover:bg-gray-800 focus:outline-none focus:bg-black focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? "Loading..." : "Sign Up"}
                </button>
              </div>
            </form>
            <div className="mt-4 text-sm text-center text-gray-600">
              <p>
                Already have an account?{" "}
                <Link to="/login" className="text-black hover:underline">
                  Login here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
