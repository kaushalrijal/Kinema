import React from "react";

const Dropdown = () => {
  return (
    // <div className="basis-1/4 flex items-center flex-col bg-secondary p-4">
    //         <div className="bg-primary flex items-center text-white p-2 rounded-lg">
    //           <Dropdown content="border-2 border-black">
    //             <DropdownTrigger>
    //               <Button
    //                 variant="solid"
    //                 className="capitalize"
    //                 color="primary"
    //               >
    //                 Season {selectedSeason}
    //               </Button>
    //             </DropdownTrigger>
    //             <DropdownMenu
    //               aria-label="Single selection example"
    //               variant="solid"
    //               color="primary"
    //               disallowEmptySelection
    //               selectionMode="single"
    //               selectedKeys={selectedValue}
    //               onSelectionChange={(selectedSeason) =>
    //                 setSelectedSeason(selectedSeason.valueOf.apply)
    //               }
    //               itemClasses={{
    //                 base: [
    //                   "rounded-sm",
    //                   "text-default-500",
    //                   "transition-opacity",
    //                   "bg-secondary",
    //                   "border-2 border-black",
    //                   "data-[hover=true]:text-white",
    //                   "data-[hover=true]:bg-primary",
    //                   "dark:data-[hover=true]:bg-default-50",
    //                   "data-[selectable=true]:focus:bg-default-50",
    //                   "data-[pressed=true]:opacity-70",
    //                   "data-[focus-visible=true]:ring-default-500",
    //                 ],
    //               }}
    //             >
    //               {movie.seasons.map((season) => {
    //                 return (
    //                   <DropdownItem key={String(season.season_number)}>
    //                     {season.name}
    //                   </DropdownItem>
    //                 );
    //               })}
    //               {/* <DropdownItem key="1">Season 1</DropdownItem>
    //             <DropdownItem key="2">Season 2</DropdownItem> */}
    //             </DropdownMenu>
    //           </Dropdown>
    //           <TriangleDownIcon />
    //         </div>
    //         <div className="flex flex-col w-64 mx-4 my-1 bg-secondary">
    //           {movie.seasons.map((item) => {
    //             let count = 0;
    //             count++;
    //             return (
    //               <div
    //                 className={`border-2 border-secondary p-2 rounded-sm ${
    //                   item.episode_count === episode
    //                     ? "bg-primary text-white"
    //                     : "bg-none text-black"
    //                 } border-none cursor-pointer lg:flex md:grid md:grid-cols-2`}
    //                 onClick={() => {
    //                   setEpisode(count);
    //                   setVisible(true);
    //                 }}
    //                 key={count}
    //               >
    //                 Episode {count}
    //               </div>
    //             );
    //           })}
    //         </div>
    //       </div>
    <div>Dorpdown goes here</div>
  );
};

export default Dropdown;
