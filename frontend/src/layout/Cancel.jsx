import React, { useEffect, useState } from "react";
import firebase from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [sessionId, setSessionId] = useState("");

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
        const userRef = firebase.database().ref("users/" + user.uid);
        userRef.on("value", (snapshot) => {
          const user = snapshot.val();
          if (user) {
            setSessionId(user.subscription.sessionId || "");
          }
        });
      }
    });
  }, [userId, sessionId]);

  console.log(sessionId);

  const handlePaymentSuccess = () => {
    fetch("https://richpanel-nine.vercel.app/api/v1/payment-success", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sessionId: sessionId, firebaseId: userId }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return res.json().then((json) => Promise.reject(json));
      })
      .then((data) => {
        console.log(data.message);
        navigate("/");
      })
      .catch((e) => {
        console.log(e.error);
      });
  };

  return (
    <div className="m-0 p-0">
      <div className="flex justify-between items-start bg-white rounded-lg">
        <div className="text-center p-8 shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h3 className="pt-6 font-bold py-2 text-slate-700">
              Current Plan Details
            </h3>
            <div className="space-x-24 pt-4 px-4">
              <span className="text-[red] bg-[pink] px-2 py-1 rounded text-sm font-semibold">
                Cancelled
              </span>
              <span className="text-[#1f4d90] text-sm font-semibold">
              </span>
            </div>
          </div>
          <div className="text-[red] px-2 py-1 pb-4 rounded text-md font-semibold">
                 No Plan
        </div>
          <div className="flex justify-start mt-2">
            <button
              onClick={() => handlePaymentSuccess()}
              className="bg-white border border-[#1f4d90] text-[#1f4d90] text-xl px-2 py-1 rounded"
            >
              Change Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
