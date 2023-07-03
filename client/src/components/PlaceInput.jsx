const InputHeader = ({ text }) => {
  return <h2 className="text-2xl mt-4">{text}</h2>;
};

const InputDescription = ({ description }) => {
  return <p className="text-gray-500 text-sm">{description}</p>;
};

export const PlaceInput = ({ header, description, children }) => {
  return (
    <>
      <InputHeader text={header} />
      <InputDescription description={description} />
      {children}
    </>
  );
};
