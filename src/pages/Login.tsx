import React, { useState } from "react";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { CredentialResponse, GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft /* add more icons as needed */ } from '@fortawesome/free-solid-svg-icons';
const timeOutMessage: number = 2000;
const CLIENT_ID: string = import.meta.env.VITE_CLIENT_ID;
const API_URL: string = import.meta.env.VITE_API_URL;

interface UserRequest {
  email: string
  password: string
}

interface UserGoogle {
  token: string
}

interface Response {
  data: {
    email: string
    password: string
    authentication: string
    token: string
  }
}

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [failMessage, setFailMessage] = useState<string>("");
  const navigate: NavigateFunction = useNavigate()

  const doLoginWithEmail = async (payload: UserRequest) => {
    const { email, password } = payload;
    const response = await fetch(
      `${API_URL}/api/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email, // proimmupraguteu-5328@yopmail.com
          password // inipassword
        })
      }
    );
    if (response.status === 401) {
      const data = await response.json();
      return data
    }
    const data = await response.json();
    return data;
  }

  const doLoginWithGoogle = async (payload: UserGoogle) => {
    const { token } = payload;
    const response = await fetch(
      `${API_URL}/api/login/google`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          googleToken: token
        })
      }
    );
    const data = await response.json();
    return data;
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    event.preventDefault();
    try {
      const payload: UserRequest = {
        email,
        password
      }
      const response: Response = await doLoginWithEmail(payload);
      if (response.data.email?.includes("email") || 
          response.data.password?.includes("size") ||
          response.data.authentication?.includes("Wrong")) {
        throw new Error(response.data.email || 
                        response.data.password ||
                        response.data.authentication)
      }
      setSuccessMessage("Login berhasil");
      localStorage.setItem("user_access_token", response.data.token)
      setTimeout(() => {
        setSuccessMessage("");
        navigate("/");
      }, timeOutMessage);
    } catch (error) {
      if (error instanceof Error) {
        setFailMessage(error.message);
        setTimeout(() => {
          setFailMessage("");
        }, timeOutMessage);
      }
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, timeOutMessage);
    }
  }

  const handleCredentialResponse = async (credentialResponse: CredentialResponse) => {
    try {
      const tokenGoogle = credentialResponse.credential as string
      const response: Response = await doLoginWithGoogle({ token: tokenGoogle })
      setSuccessMessage("Login berhasil");
      localStorage.setItem("user_access_token", response.data.token)
      setTimeout(() => {
        setSuccessMessage("");
        navigate("/");
      }, timeOutMessage);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message)
      }
    }
  }

  const handleCredentialResponseError = async () => {
    console.log("Login gagal!")
  }

  return (
    <div className="flex justify-center items-center h-screen" style={{ backgroundColor: "#B1C5FF" }}>
      <div className="flex justify-center items-center bg-white rounded-md p-4 w-9/12">
        <div className="w-1/2">
          <img src="https://i.ibb.co/Lg7hnNk/bg-login.png" alt="bg-login" className="w-full h-full object-cover" />
        </div>
        <div className="w-1/2">
          <div className="mt-10 md:pt-0 px-8 md:px-16 lg:px-2">
            {successMessage && <h3 className="text-center bg-green-500 text-white mb-3">{successMessage}</h3>}
            {failMessage && <h3 className="text-center mb-3 bg-red-500 text-white">{failMessage}</h3>}
            <div className="flex ml-5 mb-3">
              <Link to="/"> <FontAwesomeIcon icon={faArrowLeft} /> </Link> &nbsp;&nbsp;&nbsp; <h1 className="font-bold text-xl">Log In into your account</h1>
            </div>
            <form onSubmit={handleSubmit} className="mt-10 md:pt-0 px-8 md:px-16 lg:px-12">
              <>
                <div className="flex justify-between mb-3">
                  <input type="text" id="email" name="email" value={email} className="appearance-none border rounded-lg w-full py-2 px-3 mt-1  focus:outline-none focus:shadow-outline" onChange={handleChange} placeholder="Email Address" />
                </div>
                <div className="flex justify-between mb-5">
                  <input type="password" id="password" name="password" value={password} className="appearance-none border rounded-lg w-full py-2 px-3 mt-1 focus:outline-none focus:shadow-outline" onChange={handleChange} placeholder="Password" />
                </div>
                <p>
                  <span></span>
                  <span className="text-right" style={{ display: 'flex' }}>
                    <a className="pl-0 text-red-400 hover:underline hover:text-red-900" style={{ marginLeft: 'auto' }} href="#">Forgot Password?</a>
                  </span>
                </p>

                <button type="submit" className={`flex w-full justify-center rounded-full bg-indigo-600 mt-5 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${!email || !password || isLoading ? "cursor-not-allowed" : ""}`} disabled={!email || !password || isLoading}>{isLoading ? "Loading ..." : "Log in"}</button>
              </>
              <div className="mt-5"
                style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
              >
                <div style={{ flex: 1, height: '1px', backgroundColor: 'black' }} />

                <div>
                  <p style={{ width: '20px', textAlign: 'center' }}>Or</p>
                </div>

                <div style={{ flex: 1, height: '1px', backgroundColor: 'black' }} />
              </div>
            </form>

            <div className="mt-5 flex justify-center items-center">
              <GoogleOAuthProvider clientId={`${CLIENT_ID}`}>
                <GoogleLogin onSuccess={handleCredentialResponse} onError={handleCredentialResponseError} shape="circle" type="standard" text="signin_with" locale="en_US" />
              </GoogleOAuthProvider>
            </div>

            <p className="mt-5 text-center">Need an account? <Link to={'/register'} className="text-indigo-600 hover:text-indigo-500">Create an account</Link></p>
          </div>
        </div>
      </div>
    </div >
  )
}
