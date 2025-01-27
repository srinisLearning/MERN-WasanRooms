import React from "react";

const SuccessComponent = ({ message }) => {
  return (
    <div role="alert">
      <div class="bg-green-500 text-white font-bold rounded-t px-4 py-2">
        Success .....
      </div>
      <div class="border border-t-0 border-green-400 rounded-b bg-white px-4 py-3 text-green-700">
        <p>{message}</p>
      </div>
    </div>
  );
};

export default SuccessComponent;
