import React from "react";

const Watch = ({ params }: { params: { id: number } }) => {
  return (
    <div>
      <h1>Movie Id</h1>
      <p>{params.id}</p>
    </div>
  );
};

export default Watch;
