import React, { useEffect, useState } from "react";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { CredentialResponse, GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft /* add more icons as needed */ } from '@fortawesome/free-solid-svg-icons';

const timeOutMessage: number = 2000;

interface UserProps {
  email: string
  password: string
}

interface UserRequest {
  email: string
  password: string
}

export default function Register() {
  const [email, setEmail] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [tanggalLahir, setTanggalLahir] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [failMessage, setFailMessage] = useState<string>("");
  const [user, setUser] = useState<UserProps>(
    {
      email: "", // atuny0@sohu.com
      password: "" // 9uQFF1Lh
    }
  );
  const navigate: NavigateFunction = useNavigate()

  useEffect(() => {
    fetch("https://dummyjson.com/users/1")
      .then((res) => res.json())
      .then((data) => setUser({ email: data.email, password: data.password }))
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    switch (name) {
        case "email":
        setEmail(value);
        break;
        case "password":
        setPassword(value);
        break;
        case "fullName":
        setFullName(value);
        break;
        case "tanggalLahir":
        setTanggalLahir(value);
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
      if (!payload.email || !payload.password) {
        throw new Error(`${!payload.email ? "Email" : "Password"} tidak boleh kosong!`);
      }
      if (!payload.email.includes("@")) {
        throw new Error("Format email salah!");
      }
      if (payload.password.length < 8) {
        throw new Error("Password minimal 8 huruf!")
      }
      if (payload.email !== user.email) {
        throw new Error("Email tidak sesuai!");
      }
      setSuccessMessage("Register berhasil");
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
      const bearerToken: string = 'Bearer'
      const credentialToken = `${bearerToken} ${credentialResponse.credential}` as string
      if (!credentialToken.startsWith(bearerToken)) {
        throw new Error("Format token salah!")
      }
      setSuccessMessage("Register berhasil");
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
    console.log("Register gagal!")
  }

  return (
    <div className="flex justify-center items-center h-screen" style={{ backgroundColor: "#B1C5FF" }}>
      <div className="flex justify-center items-center bg-white rounded-md p-4 w-9/12">
        <div className="w-1/2">
          <img src="https://i.ibb.co/Lg7hnNk/bg-Register.png" alt="bg-Register" className="w-full h-full object-cover" />
        </div>
        <div className="w-1/2">
          <div className="mt-10 md:pt-0 px-8 md:px-16 lg:px-2">
            {successMessage && <h3 className="text-center bg-green-500 text-white mb-3">{successMessage}</h3>}
            {failMessage && <h3 className="text-center mb-3 bg-red-500 text-white">{failMessage}</h3>}
            <div className="flex ml-5 mb-3">
                <Link to="/login"> <FontAwesomeIcon icon={faArrowLeft} /> </Link> &nbsp;&nbsp;&nbsp; <h1 className="font-semibold text-xl">Register Akun</h1>
            </div>
            <form onSubmit={handleSubmit} className="mt-10 md:pt-0 px-8 md:px-16 lg:px-12">
              <>
                <div className="flex justify-between mb-3">
                  <input type="text" id="email" name="email" value={email} className="appearance-none border rounded-lg w-full py-2 px-3 mt-1  focus:outline-none focus:shadow-outline" onChange={handleChange} placeholder="Nomor Ponsel / Email" />
                </div>
                <div className="flex justify-between mb-3">
                  <input type="text" id="fullName" name="fullName" value={fullName} className="appearance-none border rounded-lg w-full py-2 px-3 mt-1  focus:outline-none focus:shadow-outline" onChange={handleChange} placeholder="Full Name" />
                </div>
                <div className="flex justify-between mb-3">
                  <input type="date" id="tanggalLahir" name="tanggalLahir" value={tanggalLahir} className="appearance-none border rounded-lg w-full py-2 px-3 mt-1  focus:outline-none focus:shadow-outline" onChange={handleChange} placeholder="Full Name" />
                </div>
                <div className="flex justify-between mb-5">
                  <input type="password" id="password" name="password" value={password} className="appearance-none border rounded-lg w-full py-2 px-3 mt-1 focus:outline-none focus:shadow-outline" onChange={handleChange} placeholder="Password" />
                </div>
                <button type="submit" className={`flex w-full justify-center rounded-full bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${!email || !password || isLoading ? "cursor-not-allowed" : ""}`} disabled={!email || !password || isLoading}>{isLoading ? "Loading ..." : "Log in"}</button>
              </>
            </form>
            <p className="mt-5 text-center">Atau Daftar dengan</p>
            <div className="mt-5 flex justify-center items-center">
            <GoogleOAuthProvider clientId="2182170302-4qed8hhs52i94pq1bob86itln3vj01f3.apps.googleusercontent.com">
              <GoogleLogin onSuccess={handleCredentialResponse} onError={handleCredentialResponseError} shape="circle" type="standard" text="signin_with"/>
            </GoogleOAuthProvider>
            </div>
                </div>
        </div>
      </div>
    </div>
  )
}