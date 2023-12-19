import React from "react";
import Card from "./card";

const CardsFullDiv = (props: {
  cols: any;
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
    <div className="p-3 ">
      <span className="mx-3 font-extrabold font-serif text-3xl">
        {props.section}
      </span>
      <div
        className={`grid 2xl:grid-cols-8 lg:grid-cols-${props.cols} xs:grid-cols-1 md:grid-cols-3 grid-cols-2 gap-0`}
      >
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
