import React, { useEffect } from "react";
import { useState } from "react";

type Props = {};
type Room = {
  room_id: string;
  p_id: string;
  fName: string;
  lName: string;
};

export default function RoomBooking({}: Props) {
  const [roomArray, setRoomArray] = useState<Room[]>([]);

  const getRoom = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/getAllRoom");
      const data = await response.json();
      console.log(data);
      setRoomArray(data);
      //   consol
    } catch (error) {
      console.error("Error fetching data from API:", error);
    }
  };

  useEffect(() => {
    getRoom();
  }, []);
  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold my-5">Room Manage</h1>

            <div className="h-56 grid grid-cols-4 gap-4 content-start ...">
              {roomArray.map((room) => (
                <button
                  key={room.room_id}
                  className={`btn btn-active ${
                    room.p_id ? "btn-primary" : "btn-accent"
                  }`}
                  onClick={() =>
                    document.getElementById(room.room_id).showModal()
                  }
                >
                  {room.room_id}
                </button>
              ))}
            </div>

            {roomArray.map((room) => (
              <dialog
                id={room.room_id}
                className="modal"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
              >
                <div className="modal-box">
                  <h3 className="font-bold text-lg">Room {room.room_id}</h3>
                  <p className="py-4">
                    {room.p_id
                      ? `Patient Name: ${room.fName} ${room.lName}`
                      : "Empty"}
                  </p>
                  <div className="flex w-full gap-2 justify-center">
                    {room.p_id ? (
                      <button
                        className="btn btn-error"
                        onClick={() =>
                          document.getElementById(room.room_id).close()
                        }
                      >
                        Check Out
                      </button>
                    ) : (
                      <>
                        <input type="text" placeholder="Patient Name" />
                        <button
                          className="btn btn-success"
                          onClick={() =>
                            document.getElementById(room.room_id).close()
                          }
                        >
                          Add Patient
                        </button>
                      </>
                    )}
                  </div>
                  <div className="modal-action">
                    <button
                      className="btn"
                      onClick={() =>
                        document.getElementById(room.room_id).close()
                      }
                    >
                      Close
                    </button>
                  </div>
                </div>
              </dialog>
            ))}
            {/* <dialog id="my_modal_1" className="modal">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">Hello!</h3>
                            <p className="py-4">
                                Press ESC key or click the button below to close
                            </p>
                            <div className="modal-action">
                                <form method="dialog">
                                    <button className="btn">Close</button>
                                </form>
                            </div>
                        </div>
                    </dialog> */}
          </div>
        </div>
      </div>
    </>
  );
}
