import axios from "axios";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Icon } from "../components/Icon";
import { PlaceInput } from "../components/PlaceInput";
import { PlacePerks } from "../components/PlacePerks";
import { PlacePhotoInput } from "../components/PlacePhotoInput";

export const PlacesPage = () => {
  const { action } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [photos, setPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);

  const navigate = useNavigate();

  const addNewPlace = async (event) => {
    event.preventDefault();
    const placeData = {
      title,
      address,
      photos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
    };
    await axios.post("/places", placeData);
    navigate("/account/places");
  };
  return (
    <div>
      {action !== "new" && (
        <div className="text-center">
          <Link
            className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
            to={"/account/places/new"}
          >
            <Icon path={"M12 4.5v15m7.5-7.5h-15"} />
            Add a new place
          </Link>
        </div>
      )}

      {action === "new" && (
        <div>
          <form onSubmit={addNewPlace}>
            <PlaceInput
              header={"Title"}
              description={
                "Title for your place. It should be short and catchy."
              }
            >
              <input
                type="text"
                placeholder="title, for example: Home sweet home"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </PlaceInput>

            <PlaceInput
              header={"Address"}
              description={"Address to this place"}
            >
              <input
                type="text"
                placeholder="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </PlaceInput>

            <PlaceInput
              header={"Photos"}
              description={"the more is the better"}
            >
              <PlacePhotoInput photos={photos} setPhotos={setPhotos} />
            </PlaceInput>

            <PlaceInput
              header={"Description"}
              description={"description of the place"}
            >
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </PlaceInput>

            <PlacePerks selected={perks} onChange={setPerks} />

            <PlaceInput
              header={"Extra info"}
              description={"additional information such as house rules"}
            >
              <textarea
                value={extraInfo}
                onChange={(e) => setExtraInfo(e.target.value)}
              />
            </PlaceInput>

            <PlaceInput
              header={"Check in & out times"}
              description={
                "add check in and out times, remember to have some time window for cleaning and extra preperations between guests"
              }
            >
              <div className="grid gap-2 sm:grid-cols-3">
                <div>
                  <h3 className="mt-2 -mb-1">Check-in time</h3>
                  <input
                    type="text"
                    placeholder="14:00"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                  />
                </div>

                <div>
                  <h3 className="mt-2 -mb-1">Check-out time</h3>
                  <input
                    type="text"
                    placeholder="14:00"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                  />
                </div>

                <div>
                  <h3 className="mt-2 -mb-1">Max number of guests</h3>
                  <input
                    type="number"
                    value={maxGuests}
                    onChange={(e) => setMaxGuests(e.target.value)}
                  />
                </div>
              </div>
            </PlaceInput>
            <button className="primary my-4">Save</button>
          </form>
        </div>
      )}
    </div>
  );
};
