import { useState } from "react";
import { Icon } from "./Icon";

export const PhotoCarousel = ({ photos }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <div className="relative rounded-2xl overflow-hidden w-10/12 max-w-5xl h-100">
      <button
        className="absolute top-1/2 bg-secondary text-primary opacity-80 p-5 -mt-5 rounded-r-md"
        onClick={() => {
          setCurrentIndex((ind) => {
            if (ind === 0) {
              return photos.length - 1;
            }

            return ind - 1;
          });
        }}
      >
        <Icon
          fill="currentColor"
          path={
            "M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z"
          }
          width={10}
          height={10}
        />
      </button>
      <img
        className="object-cover w-full h-full"
        src={`http://127.0.0.1:4000/uploads/${photos[currentIndex]}`}
        alt=""
      />
      <button
        className="absolute top-1/2 right-0 bg-secondary text-primary opacity-80 p-5 -mt-5 rounded-l-md"
        onClick={() => {
          setCurrentIndex((ind) => {
            if (ind === photos.length - 1) {
              return 0;
            }
            return ind + 1;
          });
        }}
      >
        <Icon
          fill="currentColor"
          path={
            "M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z"
          }
          width={10}
          height={10}
        />
      </button>
    </div>
  );
};
