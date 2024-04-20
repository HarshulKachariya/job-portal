import React from "react";

import { ThreeDots } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="w-screen h-screen justify-center items-center">
      <ThreeDots
        visible={true}
        height="80"
        width="80"
        color="#4fa94d"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "90vw",
          margin: "auto",
        }}
        wrapperClass=""
      />
    </div>
  );
};

export default Loader;
