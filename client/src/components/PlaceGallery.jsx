import { useState } from "react";
import { Icon } from "./Icon";
import { PhotoCarousel } from "./PhotoCarousel";

export const PlaceGallery = ({ place }) => {
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  if (showAllPhotos) {
    return (
      <div className="absolute inset-0 bg-white min-h-screen">
        <div className="p-8 grid gap-4">
          <div>
            <h2 className="text-3xl font-semibold text-center">
              Photos of {place.title}
            </h2>
            <button
              onClick={() => setShowAllPhotos(false)}
              className="fixed right-12 top-8 text-white flex gap-1 py-2 px-4 rounded-2xl bg-primary shadow shadow-gray-700"
            >
              <Icon
                path={
                  "M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                }
                fill={"currentColor"}
              />
              Close photos
            </button>
          </div>
          <div className="flex justify-center mt-16">
            <PhotoCarousel photos={place.photos} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative max-w-5xl cursor-pointer"
      onClick={() => setShowAllPhotos(true)}
    >
      <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
        <div>
          {place.photos?.[0] && (
            <div>
              <img
                className="aspect-square object-cover"
                src={`http://127.0.0.1:4000/uploads/${place.photos[0]}`}
              />
            </div>
          )}
        </div>
        <div className="grid">
          {place.photos?.[1] && (
            <img
              className="aspect-square object-cover"
              src={`http://127.0.0.1:4000/uploads/${place.photos[1]}`}
            />
          )}
          <div className="overflow-hidden">
            {place.photos?.[2] && (
              <img
                className="aspect-square object-cover relative top-2"
                src={`http://127.0.0.1:4000/uploads/${place.photos[2]}`}
              />
            )}
          </div>
        </div>
      </div>
      <button
        onClick={() => setShowAllPhotos(true)}
        className="absolute bottom-2 right-2 py-2 px-4 bg-secondary opacity-80 rounded-2xl shadow-md shadow-gray-500"
      >
        Show more photos
      </button>
    </div>
  );
};
