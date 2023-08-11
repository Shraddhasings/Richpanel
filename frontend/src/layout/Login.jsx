// import React from "react";
// import { useState } from "react";
// import firebase from "../firebase/firebaseConfig";
// import { Navigate, useNavigate } from "react-router-dom";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try{
//         if (!email || !password) {
//             console.log("Please fill all the fields");
//           }
//           const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//           if (!emailRegex.test(email)) {
//             console.log("Email invalid.");
//             return;
//           }
      
//           const response = await firebase.auth().signInWithEmailAndPassword(email, password);
      
//           if(response.user){
//               setEmail("");
//               setPassword("");
//               await navigate("/");
//           }
//     } catch(error){
//         console.log("Login error", error)
//     };

    
//   };
//   return (
//     <div className="flex justify-center items-center min-h-screen">
//       <form
//         onSubmit={handleSubmit}
//         className="w-full max-w-lg mx-auto bg-white text-[#000000] shadow-2xl rounded-3xl"
//       >
//         <div className="pt-10 pb-3 text-xl font-bold text-center text-[#000000]">
//           Login to your account
//         </div>

//         <div className="w-full flex flex-col px-14 py-6">
//           <label>Email</label>
//           <input
//             type="email"
//             className="w-full border border-gray-300 rounded-lg px-3 py-3 mt-1 text-lg outline-none bg-white"
//             placeholder="example@email.com"
//             required
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>

//         <div className="w-full flex flex-col px-14 pb-8">
//           <label>Password</label>
//           <input
//             type="password"
//             className="w-full border border-gray-300 rounded-lg px-3 py-3 mt-1 text-lg outline-none bg-white"
//             placeholder="******"
//             required
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>
//         <div className="w-full px-10 pb-2 bg-white">
//           <div className="flex items-center bg-white">
//             <input
//               type="checkbox"
//               className="mr-2 bg-white"
//               id="rememberMe"
//               // You can set the checked attribute based on your logic
//             />
//             <label htmlFor="rememberMe" className="text-sm flex bg-white items-center">
//               <span className="mr-1">Remember Me</span>
//             </label>
//           </div>
//         </div>

//         <div className="w-full flex justify-between items-center px-14 pb-8 text-[#3d5fc4]">
//           <div>Don't have an account?</div>
//           <div>
//             <a href="/register" className="hover:underline">
//               Register Now
//             </a>
//           </div>
//         </div>
//         <div className="mx-auto flex justify-center items-center pt-6 pb-16">
//           <button
//             type="submit"
//             className="bg-[#3d5fc4] text-white rounded-md text-base uppercase w-24 py-2"
//           >
//             Login
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from "react";
import firebase from "../firebase/firebaseConfig";
import { Navigate, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!email || !password) {
        console.log("Please fill all the fields");
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        console.log("Email invalid.");
        return;
      }

      const response = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);

      if (response.user) {
        setEmail("");
        setPassword("");
        await navigate("/");
      }
    } catch (error) {
      console.log("Login error", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg mx-auto bg-white text-[#000000] shadow-2xl rounded-3xl"
      >
        <div className="pt-10 pb-8 text-xl font-bold text-center">
          Log in to your account
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
        <div className="w-full px-10 pb-4">
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
            Login
          </button>
        </div>
        <div className="w-full px-14 pb-4 text-[#00000] text-center">
          <div>
            New to MyApp?{" "}
            <a href="/register" className="hover:underline ">
              Sign Up
            </a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
