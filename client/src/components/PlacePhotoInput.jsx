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

const PhotoList = ({ photos, setPhotos }) => {
  const removePhoto = (event, fileName) => {
    event.preventDefault();
    setPhotos([...photos.filter((photo) => photo !== fileName)]);
  };

  const selectAsMain = (event, fileName) => {
    event.preventDefault();
    setPhotos([fileName, ...photos.filter((photo) => photo !== fileName)]);
  };

  return photos.map((link) => (
    <div className="h-32 flex relative" key={link}>
      <img
        className="rounded-2xl w-full object-cover"
        src={`http://127.0.0.1:4000/uploads/${link}`}
      />
      <button
        onClick={(event) => removePhoto(event, link)}
        className="cursor-pointer absolute bottom-1 right-1 text-secondary bg-primary bg-opacity-50 p-1 rounded-2xl"
      >
        <Icon path="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
      </button>

      <button
        onClick={(event) => selectAsMain(event, link)}
        className="cursor-pointer absolute bottom-1 left-1 text-secondary bg-primary bg-opacity-50 p-1 rounded-2xl"
      >
        {link == photos[0] ? (
          <Icon
            fill="currentColor"
            path="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
          />
        ) : (
          <Icon path="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
        )}
      </button>
    </div>
  ));
};

export const PlacePhotoInput = ({ photos, setPhotos }) => {
  return (
    <>
      <PhotoLinkInput setPhotos={setPhotos} />
      <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {photos.length > 0 && (
          <PhotoList photos={photos} setPhotos={setPhotos} />
        )}
        <PhotoUploadInput setPhotos={setPhotos} />
      </div>
    </>
  );
};
