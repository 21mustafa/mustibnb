import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AddressLink } from "../components/AddressLink";
import { BookingWidget } from "../components/BookingWidget";
import { Icon } from "../components/Icon";
import { PhotoCarousel } from "../components/PhotoCarousel";
import { PlaceGallery } from "../components/PlaceGallery";

export const PlacePage = () => {
  const [place, setPlace] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;
    axios.get(`/places/${id}`).then(({ data }) => {
      setPlace(data);
    });
  }, [id]);

  return (
    <div className="mt-8 flex flex-col items-center">
      <h1 className="text-3xl font-light">{place.title}</h1>
      <AddressLink address={place.address} />
      <PlaceGallery place={place} />

      <div className="mt-8 gap-8 grid grid-cols-1 md:grid-cols-[2fr_1fr] w-full">
        <div className="flex flex-col justify-center">
          <div className="my-2">
            <h2 className="font-semibold text-2xl">Description</h2>
            {place.description}
          </div>
          <div className="flex">
            <b>Check-in:</b> {place.checkIn}
          </div>

          <div className="flex">
            <b>Check-out:</b> {place.checkOut}
          </div>

          <div className="flex">
            <b>Max number of guests: </b> {place.maxGuests}
          </div>
        </div>
        <BookingWidget price={place.price} placeID={place._id} />
      </div>

      <div className="my-4">
        <h2 className="font-semibold text-2xl">More Information</h2>
        {place.extraInfo}
      </div>
    </div>
  );
};
