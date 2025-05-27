import React from "react";

const SubDetails = (props: {
  Title: React.ReactNode;
  Value: React.ReactNode;
}) => {
  return (
    <div className="text-black dark:text-white">
      <b className="text-black dark:text-white">{props.Title}</b>: {props.Value}
    </div>
  );
};

export default SubDetails;
