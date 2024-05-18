import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment-timezone";

type Props = {};

export default function CheckIn({}: Props) {
  const [email, setEmail] = useState("");
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  );

  useEffect(() => {}, [email]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const checkIn = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(email);
    try {
      const response = await axios.post("http://localhost:3000/CheckIn", {
        email,
        toDay,
        currentTime,
      });
      alert(response.data);
      setEmail("");
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  // const toDay = new Date().toISOString().slice(0, 10);
  const toDay = moment().tz("Asia/Bangkok").format("YYYY-MM-DD");
  const [sec, setSec] = useState(0);
  const [min, setMin] = useState(0);
  const [hour, setHour] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      const date = new Date();
      setSec(date.getSeconds());
      setMin(date.getMinutes());
      setHour(date.getHours());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      <form onSubmit={checkIn}>
        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-5xl font-bold br-4 my-4">Hello there</h1>
              <h1 className="text-4xl">Today is {toDay}</h1>
              <div className="hero bg-base-200 my-2">
                <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
                  <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                    <span className="countdown font-mono text-5xl">
                      <span style={{ "--value": hour }}></span>
                    </span>
                    hours
                  </div>
                  <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                    <span className="countdown font-mono text-5xl">
                      <span style={{ "--value": min }}></span>
                    </span>
                    min
                  </div>
                  <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                    <span className="countdown font-mono text-5xl">
                      <span style={{ "--value": sec }}></span>
                    </span>
                    sec
                  </div>
                </div>
              </div>
              <input
                type="email"
                placeholder="EMAIL"
                className="input input-bordered w-full max-w-xs br-4 my-4"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button className="btn btn-primary" type="submit">
                check-in
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
