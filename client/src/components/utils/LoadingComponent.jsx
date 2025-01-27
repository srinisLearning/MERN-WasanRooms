import React, { useState } from "react";

import CircleLoader from "react-spinners/CircleLoader";
function LoadingComponent() {
  return (
    <div className="flex h-screen justify-center items-center">
      <CircleLoader color="#00c000" size={98} speedMultiplier={-5} />
    </div>
  );
}

export default LoadingComponent;
