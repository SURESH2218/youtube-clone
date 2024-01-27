import React from "react";

const data = [
  {
    name: "All",
  },
  {
    name: "Gaming",
  },
  {
    name: "Mixes",
  },
  {
    name: "Music",
  },
  {
    name: "Live",
  },
  {
    name: "Computer Programming",
  },
  {
    name: "Samsung",
  },
  {
    name: "Sports",
  },
  {
    name: "Chill-out",
  },

  {
    name: "Indian",
  },

  {
    name: "Cricket",
  },
  {
    name: "Hockey",
  },
  {
    name: "Chess",
  },
  {
    name: "Chess",
  },
];
const Button = () => {
  return (
    <div className="flex gap-3 my-3">
      {data.map((names, index) => {
        const { name } = names;
        return (
          <div
            key={index}
            className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300 cursor-pointer min-w-fit"
          >
            {name}
          </div>
        );
      })}
    </div>
  );
};

export default Button;
