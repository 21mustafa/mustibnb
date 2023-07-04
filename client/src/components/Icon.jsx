export const Icon = ({ path, width = 6, height = 6, fill="none" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill={fill}
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={`w-${width} h-${height}`}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d={path} />
    </svg>
  );
};
