import axios from "axios";
import { useState } from "react";
import { Icon } from "./Icon";

const PhotoLinkInput = ({ setPhotos }) => {
  const [photoLink, setPhotoLink] = useState("");
  const addPhotoByLink = async (event) => {
    event.preventDefault();
    const { data } = await axios.post("/upload-by-link", { link: photoLink });
    setPhotos((prevPhotos) => [...prevPhotos, data]);
    setPhotoLink("");
  };

  return (
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
  );
};

const PhotoUploadInput = ({ setPhotos }) => {
  const uploadPhoto = async (event) => {
    event.preventDefault();
    const files = event.target.files;
    const formData = new FormData();

    for (let file of files) {
      formData.append("photos", file);
    }

    const response = await axios.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const { data: filenames } = response;
    setPhotos((prevPhotos) => [...prevPhotos, ...filenames]);
  };
  return (
    <label className="h-32 cursor-pointer flex items-center justify-center border bg-transparent rounded-2xl p-2 text-2xl text-gray-600">
      <input type="file" multiple className="hidden" onChange={uploadPhoto} />
      <Icon
        path={
          "M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
        }
      />
      <span className="text-lg ml-2">Upload</span>
    </label>
  );
};

const PhotoList = ({ photos }) => {
  return photos.map((link) => (
    <div className="h-32 flex justify-center" key={link}>
      <img
        className="rounded-2xl object-center"
        src={`http://127.0.0.1:4000/uploads/${link}`}
      />
    </div>
  ));
};

export const PlacePhotoInput = ({ photos, setPhotos }) => {
  return (
    <>
      <PhotoLinkInput setPhotos={setPhotos} />
      <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {photos.length > 0 && <PhotoList photos={photos} />}
        <PhotoUploadInput setPhotos={setPhotos} />
      </div>
    </>
  );
};
