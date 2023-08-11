import React, { useState } from "react";
import firebase from "../firebase/firebaseConfig";
import { Navigate, useNavigate } from "react-router-dom";

const Register = () => {
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !fullname || !password) {
      console.log("Please fill all the fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log("Email invalid.");
      return;
    }

    try {
      const response = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      if (response.user) {
        await response.user.updateProfile({
          displayName: fullname,
        });

        const uid = response.user.uid;
        const userRef = firebase.database().ref("users/" + uid);
        await userRef.set({
          uid: uid,
          email: email,
          username: fullname,
        });

        setFullName("");
        setEmail("");
        setPassword("");

        navigate("/login");
      }
    } catch (error) {
      console.error("Error registering:", error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg mx-auto bg-white text-[#000000] shadow-2xl rounded-3xl"
      >
        <div className="pt-10 pb-8 text-xl font-bold capitalize text-center">
          Create Account
        </div>
        <div className="w-full px-10 pb-4">
          <label>Name</label>
          <input
            type="text"
            className="w-full border border-gray-400 rounded-md px-3 py-1 outline-none bg-white"
            placeholder="Manoj Kumar"
            required
            value={fullname}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div className="w-full px-10 pb-4">
          <label>Email</label>
          <input
            type="email"
            className="w-full border border-gray-400 rounded-md px-3 py-1 outline-none bg-white"
            placeholder="manoj@richpanel.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="w-full px-10 pb-6">
          <label>Password</label>
          <input
            type="password"
            className="w-full border border-gray-400 rounded-md px-3 py-1 outline-none bg-white"
            placeholder="••••••••••••••"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="w-full px-10 pb-2 bg-white">
          <div className="flex items-center bg-white">
            <input
              type="checkbox"
              className="mr-2 bg-white"
              id="rememberMe"
              // You can set the checked attribute based on your logic
            />
            <label htmlFor="rememberMe" className="text-sm flex bg-white items-center">
              <span className="mr-1">Remember Me</span>
            </label>
          </div>
        </div>

        <div className="mx-auto flex justify-center items-center pb-4">
          <button
            type="submit"
            className="bg-[#204c94] text-white rounded-md text-base uppercase px-24 py-2"
          >
            Sign Up
          </button>
        </div>

        <div className="w-full px-14 pb-4 text-[#00000] text-center">
          <div>
            Already have an account?{" "}
            <a href="/login" className="hover:underline ">
              Login
            </a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
