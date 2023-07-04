export const PlaceImage = ({
  place,
  index = 0,
  className = "object-cover",
}) => {
  if (!place.photos?.length) {
    return null;
  }
  return (
    place.photos.length > 0 && (
      <img
        className={className}
        src={"http://127.0.0.1:4000/uploads/" + place.photos[index]}
        alt=""
      />
    )
  );
};
