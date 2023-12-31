import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AddressLink } from "../components/AddressLink";
import { BookingDates } from "../components/BookingDates";
import { PlaceGallery } from "../components/PlaceGallery";

export const BookingPage = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    if (id) {
      axios.get("/bookings").then(({ data }) => {
        const foundBooking = data.find((booking) => booking._id === id);
        if (foundBooking) {
          setBooking(foundBooking);
        }
      });
    }
  }, [id]);

  if (!booking) {
    return null;
  }

  return (
    <div className="my-8">
      <h1 className="text-3xl">{booking.place.title}</h1>
      <AddressLink address={booking.place.address} />
      <div className="bg-secondary p-6 my-6 rounded-2xl flex items-center justify-between">
        <div>
          <h2 className="text-2xl mb-4">Your booking information</h2>
          <BookingDates booking={booking} />
        </div>
        <div className="bg-primary p-6 text-white rounded-2xl">
          <div>Total price</div>
          <div className="text-2xl">{booking.price}</div>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <PlaceGallery place={booking.place} />
      </div>
    </div>
  );
};
