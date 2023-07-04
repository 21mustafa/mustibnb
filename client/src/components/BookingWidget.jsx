import { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export const BookingWidget = ({ price, placeID }) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numOfGuests, setNumOfGuests] = useState(1);

  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const { user } = useContext(UserContext);
  const [name, setName] = useState(user ? user.name : "");

  useEffect(() => {
    user && setName(user.name);
  }, [user]);

  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  const bookPlace = async () => {
    const bookData = {
      checkIn,
      checkOut,
      name,
      phone,
      numOfGuests,
      place: placeID,
      price: numberOfNights * price,
    };
    const { data } = await axios.post("/bookings", bookData);
    const bookingId = data._id;
    navigate(`/account/bookings/${bookingId}`);
  };

  return (
    <div className="sticky max-w-lg shadow-md shadow-gray-400 p-4 rounded-2xl border border-gray-200">
      <div className="text-2xl ">
        <span className="font-semibold">${price} CAD</span>{" "}
        <span className="font-light"> night</span>
      </div>

      <div className="rounded-2xl border mt-4">
        <div className="flex">
          <div className="py-3 px-4 ">
            <label>
              Check-in
              <input
                type="date"
                value={checkIn}
                onChange={(event) => setCheckIn(event.target.value)}
              />
            </label>
          </div>

          <div className="py-3 px-4 border-l">
            <label>
              Check-out
              <input
                type="date"
                value={checkOut}
                onChange={(event) => setCheckOut(event.target.value)}
              />
            </label>
          </div>
        </div>

        <div className="py-3 px-4 border-t">
          <label>
            Guests
            <input
              type="number"
              value={numOfGuests}
              onChange={(event) => setNumOfGuests(event.target.value)}
            />
          </label>
        </div>

        {numberOfNights > 0 && (
          <div>
            <div className="py-3 px-4 border-t">
              <label>
                Name
                <input
                  type="text"
                  placeholder="Jane Doe"
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                />
              </label>
            </div>
            <div className="px-4">
              <label>
                Phone number
                <input
                  type="tel"
                  placeholder="+1 (999) 999-9999"
                  value={phone}
                  onChange={(event) => {
                    setPhone(event.target.value);
                  }}
                />
              </label>
            </div>
          </div>
        )}
      </div>

      <button className="primary text-white mt-4" onClick={bookPlace}>
        Book this place
        {numberOfNights > 0 && (
          <span className="ml-1">for ${numberOfNights * price} CAD</span>
        )}
      </button>
    </div>
  );
};
