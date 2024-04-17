import React from "react";

const ImageCard = () => {
  return (
    <div className="left mb-4 flex items-center justify-center py-2">
      <img
        src="https://randomuser.me/api/portraits/men/67.jpg"
        alt="profile"
        className="w-20 h-20 rounded-full"
      />
      <div className="flex flex-col mx-2 px-2">
        <h3 className="text-xl md:text-2xl font-semibold">John Doe</h3>
        <h4 className="text-xs sm:text-sm md:text-base text-gray-800">
          @john_doe
        </h4>
      </div>
    </div>
  );
};

export default ImageCard;
