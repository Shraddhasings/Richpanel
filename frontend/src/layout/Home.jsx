import React, { useEffect, useState } from "react";
import firebase from "../firebase/firebaseConfig";

const data = [
  {
    id: 0,
    title: "Monthly",
    price: "Monthly price",
    video: "Video quality",
    res: "Resolution",
    devices:
      "Devices you can use to watch  ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ",
  },
  {
    id: 1,
    title: "Mobile",
    price: "100",
    video: "Good",
    res: "480p",
    devices: "Phone, Tablet, \n",
  },
  {
    id: 2,
    title: "Basic",
    price: "200",
    video: "Good",
    res: "480p",
    devices: "Phone, Tablet, Computer, TV",
  },
  {
    id: 3,
    title: "Standard",
    price: "500",
    video: "Better",
    res: "1080p",
    devices: "Phone, Tablet, Computer, TV",
  },
  {
    id: 4,
    title: "Premium",
    price: "700",
    video: "Best",
    res: "4K + HDR",
    devices: "Phone, Tablet, Computer, TV",
  },
];

const Home = () => {
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
        setUserName(user.displayName);
      } else {
        setUserId("");
        setUserName("");
      }
    });
  }, [userId]);

  const checkout = (plan) => {
    fetch("http://localhost:5000/api/v1/create-subscription-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({ plan: plan, customerId: userId }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        console.log(res);
        return res.json().then((json) => Promise.reject(json));
      })
      .then(({ session }) => {
        window.location = session.url;
      })
      .catch((e) => {
        console.log(e.error);
      });
  };

  return (
    <>
      <div className="bg-white flex flex-col items-center w-full mx-auto min-h-screen overflow-x-hidden">
        <div className="flex justify-end items-center w-full px-6 h-20 bg-[#ffffff]">
          <div className="flex justify-center items-center gap-2">
            {!userId ? (
              <a
                href="/login"
                className="bg-white px-4 py-2 uppercase w-auto rounded-lg text-xl text-[#4f7cff] font-semibold"
              >
                Login
              </a>
            ) : (
              <div className="flex justify-center items-center space-x-4">
                <span className="text-black text-xl">{userName}</span>
                <button
                  onClick={() => firebase.auth().signOut()}
                  className="bg-black px-4 py-2 w-auto rounded-lg text-base uppercase font-semibold text-[#ffffff]"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="grid lg:grid-cols-5 sm:grid-cols-5 grid-cols-1 gap-5 z-50 place-items-center w-9/12 mx-auto mt-20">
          {data.map((item, idx) => (
            <div
              key={idx}
              className="bg-white px-6 py-8 rounded-xl text-black w-full mx-auto grid place-items-center"
            >
              <div className="text-2xl text-slate-700 text-center py-4 font-bold">
                {item.title}
              </div>
              <hr className="w-24 mx-auto mt-2 border-t border-gray-300" />
              <div className="flex flex-col items-center">
                <div className="text-xs text-center font-bold py-4">
                  {item.price}
                </div>
                <hr className="w-24 mx-auto mt-2 border-t border-gray-300" />
                <div className="text-xs text-center font-bold py-4">
                  {item.video}
                </div>
                <hr className="w-24 mx-auto mt-2 border-t border-gray-300" />
                <div className="text-xs text-center font-bold py-4">
                  {item.res}
                </div>
                <hr className="w-24 mx-auto mt-2 border-t border-gray-300" />
                <div className="text-xs text-center font-bold py-4">
              {item.devices.split(', ').map((device, index) => (
                <div key={index}>{device}</div>
              ))}
              {item.id === 1 && <br />}
              {item.id === 1 && <br />}
              {item.id === 0 && <br />}
              {item.id === 0 && <br />}
              {item.id === 0 && <br />}
              {item.id === 0 && <br />}
              {item.id === 0 && <br />}
              {item.id === 0 && <br />}
            </div>
              </div>
              {item.title !== "Monthly" && (
                <div className="mx-auto flex justify-center items-center my-3">
                  <button
                    onClick={() => checkout(Number(item.price))}
                    className="bg-[#3d5fc4] text-white rounded text-base uppercase w-24 py-2 font-bold"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
