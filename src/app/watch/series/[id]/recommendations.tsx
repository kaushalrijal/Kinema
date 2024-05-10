import Card from "@/app/components/card";
import Link from "next/link";
import React from "react";

const Recommendations = (props) => {
  return (
    <div>
      <hr className="mx-4 mb-6" />
      <span className="text-3xl p-4">You may also like</span>
      <div className="p-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full">
        {props.data.length === 0
          ? "OOPS No suggestions."
          : props.data.map((item) => {
              return (
                <Link href={`/watch/series/${item.id}`} key={item.id}>
                  <Card
                    Img={item.poster_path}
                    Type="Series"
                    Title={
                      item.name!.length > 15
                        ? item.name!.slice(0, 15) + "..."
                        : item.name
                    }
                    Date={item.first_air_date.slice(0, 4)}
                    RunTime={item.vote_average.toFixed(1)}
                  />
                </Link>
              );
            })}
      </div>
    </div>
  );
};

export default Recommendations;
