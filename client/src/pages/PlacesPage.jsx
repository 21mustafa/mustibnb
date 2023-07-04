import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AccountNav } from "../AccountNav";
import { Icon } from "../components/Icon";

export const PlacesPage = () => {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("/places").then(({ data }) => {
      setPlaces(data);
    });
  }, []);
  return (
    <div>
      <AccountNav />

      <div className="text-center">
        <Link
          className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
          to={"/account/places/new"}
        >
          <Icon path={"M12 4.5v15m7.5-7.5h-15"} />
          Add a new place
        </Link>
      </div>

      <div className="mt-8">
        {places.length > 0 &&
          places.map((place) => (
            <Link
              to={`/account/places/${place._id}`}
              className="flex gap-4 bg-gray-100 p-5 rounded-2xl cursor-pointer"
            >
              <div className="flex w-32 h-32 bg-gray-300 grow shrink-0">
                {place.photos.length > 0 && (
                  <img
                    className="object-cover"
                    src={"http://127.0.0.1:4000/uploads/" + place.photos[0]}
                    alt=""
                  />
                )}
              </div>
              <div className="grow-0 shrink">
                <h2 className="text-xl">{place.title}</h2>
                <p className="text-sm mt-2 h-20 overflow-x-auto">
                  {place.description}
                </p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};
