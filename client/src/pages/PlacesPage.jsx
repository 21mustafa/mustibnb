import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Icon } from "../components/Icon";
import { PlaceInput } from "../components/PlaceInput";
import { PlacePerks } from "../components/PlacePerks";
import axios from "axios";

export const PlacesPage = () => {
  const { action } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [photos, setPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);

  const addPhotoByLink = async (event) => {
    event.preventDefault();
    const { data } = await axios.post("/upload-by-link", { link: photoLink });
    setPhotos((prevPhotos) => [...prevPhotos, data]);
    setPhotoLink("");
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
          <form>
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
              <div className="flex gap-2">
                <input
                  value={photoLink}
                  onChange={(e) => setPhotoLink(e.target.value)}
                  type="text"
                  placeholder="Add using a link (....jpg)"
                />
                <button
                  onClick={addPhotoByLink}
                  className="bg-secondary px-4 rounded-2xl"
                >
                  Add&nbsp;photo
                </button>
              </div>
              <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {photos.length > 0 &&
                  photos.map((link) => (
                    <div>
                      <img
                        className="rounded-2xl"
                        src={`http://127.0.0.1:4000/uploads/${link}`}
                      />
                    </div>
                  ))}
                <button className="flex items-center justify-center border bg-transparent rounded-2xl p-2 text-2xl text-gray-600">
                  <Icon
                    path={
                      "M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                    }
                  />
                  <span className="text-lg ml-2">Upload</span>
                </button>
              </div>
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
