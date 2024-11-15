
import Header from "../components/Header";
import ApiConnection from "../components/ApiConnection";
import axios from "axios";
import React, { createContext, useState, useContext, useEffect } from "react";
import Home from "./Home";
import { Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function Register() {
  const [isLegal, setIsLegal] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isSeller, setisSeller] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("Nitish");
  const [password, setPassword] = useState("Nitish123455Asd!@");
  const [passwordValidationMessage, setPasswordValidationMessage] =
    useState("");
  const [email, setEmail] = useState("nitish@gmail.com");
  const [token, setToken] = useState(localStorage.getItem("token"));


  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate(); // Initialize navigate
  const useToken = () => useContext(TokenContext);
  const TokenContext = createContext();

  const login = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${ApiConnection()}/api/auth/login`, {
        email,
        password,
      });

      const data = response.data;

      if (response.status === 200) {
        localStorage.setItem("token", data.token); // Save the token for future authenticated requests
        setToken(data.token);
        setSuccessMessage("Login successful");
        setLoading(false);
        setErrorMessage("");

        toast.info("Logged in!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });

        // Show success message and redirect after 1 second
        setTimeout(() => {
          navigate("/home"); // Use the navigate function to redirect
          window.location.reload(); // Force a page reload after navigation
        }, 500); // 1000 milliseconds = 1 second
      } else {
        setErrorMessage(data.message || "Login failed");
        setSuccessMessage("");
      }
    } catch (error) {
      console.log(error);
      setLoading(false); // Ensure loading is reset
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const response = await axios.post(
        `${ApiConnection()}/api/auth/register`,
        {
          name,
          email,
          password,
          isSeller,
        },
        {}
      );
      login();
      const data = response.data;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading) return;
    const registerButton = document.getElementById("register-button");
    if (isLegal && acceptedTerms) {
      registerButton.disabled = false;
    } else {
      registerButton.disabled = true;
    }
  }, [isLegal, acceptedTerms]);

  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;

    if (id === "check-legal") {
      setIsLegal(checked);
    } else if (id === "check-terms") {
      setAcceptedTerms(checked);
    } else if (id === "check-verhuurder") {
      setisSeller(checked);
      console.log("changed user " + isSeller);
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    const validationMessage = validatePassword(newPassword);
    setPasswordValidationMessage(validationMessage);
  };

  const validatePassword = (password) => {
    const minLength = 8;
    const hasNumber = /\d/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
      return "Password must be at least 8 characters long.";
    }
    if (!hasLowerCase) {
      return "Password must contain at least one lowercase letter.";
    }
    if (!hasUpperCase) {
      return "Password must contain at least one uppercase letter.";
    }
    if (!hasNumber) {
      return "Password must contain at least one number.";
    }
    if (!hasSpecialChar) {
      return "Password must contain at least one special character.";
    }
    return ""; // Valid password
  };


  if (loading) {
    return (
      <>
        <div className="bg-sec-white min-h-screen">
          <Header />
          <div className="flex justify-center items-center h-64 gap-x-8 gap-y-2">
        <FontAwesomeIcon icon={faSpinner} spin size="2x" />
      </div>
      </div>
      </>
    )
  }

  return (
    <>
      <Header />
      <div className="flex max-w min-h-screen flex-1 flex-col justify-center px-6 lg:px-8 bg-[#dddddd46]">
        <div className="bg-white px-40 p-8 m-8 rounded-md mx-auto">
          <div className="sm:mx-auto sm:w-20 sm:max-w-20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="mx-auto h-auto w-auto"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819"
              />
            </svg>
          </div>

          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Register your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Full Name
                </label>
                <div className="mt-3">
                  <input
                    id="user"
                    name="user"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="none"
                    className="block w-full rounded-md border-0 py-1.5 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-3">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password
                    </label>
                    <div className="text-sm">
                      <a
                        href="#"
                        className="font-semibold text-[#4db2b0] hover:text-[#62e3e1] duration-300 ease-in-out transform"
                      >
                        Forgot password?
                      </a>
                    </div>
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="current-password"
                      className="block w-full rounded-md border-0 py-1.5 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <label
                  htmlFor="confirm-password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm Password
                </label>
                <div className="mt-3">
                  <input
                    id="confirm-password"
                    name="confirm-password"
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                    autoComplete="none"
                    className="block w-full rounded-md border-0 py-1.5 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="relative flex flex-col rounded-xl bg-white shadow">
                <nav className="flex min-w-[240px] flex-col gap-1 p-2">
                  <div
                    role="button"
                    className="flex w-full items-center rounded-lg p-0 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
                  >
                    <label
                      htmlFor="check-legal"
                      className="flex w-full cursor-pointer items-center px-3 py-2"
                    >
                      <div className="inline-flex items-center">
                        <input
                          type="checkbox"
                          id="check-legal"
                          onChange={handleCheckboxChange}
                          className="peer h-5 w-5 cursor-pointer transition-all rounded shadow hover:shadow-md border border-slate-300 checked:bg-tert-blue checked:border-slate-800"
                        />
                        <label
                          htmlFor="check-legal"
                          className="cursor-pointer ml-2 text-slate-600 text-sm"
                        >
                          Are you over 18?
                        </label>
                      </div>
                    </label>
                  </div>
                  <div
                    role="button"
                    className="flex w-full items-center rounded-lg p-0 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
                  >
                    <label
                      htmlFor="check-terms"
                      className="flex w-full cursor-pointer items-center px-3 py-2"
                    >
                      <div className="inline-flex items-center">
                        <input
                          type="checkbox"
                          id="check-terms"
                          onChange={handleCheckboxChange}
                          className="peer h-5 w-5 cursor-pointer transition-all rounded shadow hover:shadow-md border border-slate-300 checked:bg-tert-blue checked:border-slate-800"
                        />
                        <label
                          htmlFor="check-terms"
                          className="cursor-pointer ml-2 text-slate-600 text-sm"
                        >
                          <span class="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              class="h-3.5 w-3.5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              stroke="currentColor"
                              stroke-width="1"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clip-rule="evenodd"
                              ></path>
                            </svg>
                          </span>

                          <p>
                            I agree with the{" "}
                            <a
                              href="#"
                              className="font-medium hover:text-slate-800 underline"
                            >
                              terms and conditions
                            </a>
                            .
                          </p>
                        </label>
                      </div>
                    </label>
                  </div>
                </nav>
              </div>
              <div className="relative flex flex-col rounded-xl bg-white shadow">
                <nav className="flex min-w-[240px] flex-col gap-1 p-2">
                  <div
                    role="button"
                    className="flex w-full items-center rounded-lg p-0 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
                  >
                    <label className="flex w-full cursor-pointer items-center px-3 py-2">
                      <div className="inline-flex items-center">
                        <input
                          type="checkbox"
                          id="check-verhuurder"
                          onChange={handleCheckboxChange}
                          className="peer h-5 w-5 cursor-pointer transition-all rounded shadow hover:shadow-md border border-slate-300 checked:bg-tert-blue checked:border-slate-800"
                        />
                        <span className="ml-2 text-slate-600 text-sm">
                          Registreer als verhuurder?
                        </span>
                      </div>
                    </label>
                  </div>
                </nav>
              </div>

              <div>
                <button
                  type="submit"
                  id="register-button"
                  disabled={true}
                  className="w-full flex justify-center rounded-md transition-all bg-[#4db2b0] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#62e3e1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#62e3e1] disabled:bg-gray-300"
                >
                  Register
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Have an account?{" "}
              <a
                href="/Login"
                className="font-semibold leading-6 text-[#4db2b0] hover:text-[#62e3e1] duration-300 ease-in-out transform"
              >
                Log in
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
