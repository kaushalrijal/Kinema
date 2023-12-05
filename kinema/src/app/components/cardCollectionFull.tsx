import React from "react";
import Card from "./card";
import walter from "../../../public/brbad.jpg";

const CardsFullDiv = (props: {
  data: any;
  section:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | Iterable<React.ReactNode>
    | React.ReactPortal
    | React.PromiseLikeOfReactNode
    | null
    | undefined;
}) => {
  let elements = props.data;
  return (
    <div className="p-3 mt-2">
      <span className="m-3 font-extrabold font-serif text-3xl">
        {props.section}
      </span>
      <div className="grid lg:grid-cols-4 xl:grid-cols-5 xs:grid-cols-1 md:grid-cols-3 grid-cols-2 gap-0">
        {elements.map(
          (item: {
            title: any;
            img: any;
            type: any;
            year: any;
            runtime: any;
            key: any;
          }) => (
            <Card
              Title={item.title}
              Img={item.img}
              Type={item.type}
              Date={item.year}
              RunTime={item.runtime}
              key={item.key}
            ></Card>
          )
        )}
      </div>
    </div>
  );
};

export default CardsFullDiv;
