import Hero from "./components/hero";
import HCardDiv from "./components/cardCollectionH";
import VCardDiv from "./components/cardCollectionV";
import Warning from "./components/warning";
import CardsGrid from "./components/cardsGrids";


export default function Home() {
  return (
    <main className="">
      <Hero />
      <HCardDiv></HCardDiv>
      <div className="flex">
        <div>
          <CardsGrid />
        </div>
        <div className="hidden lg:flex p-4">
          <VCardDiv customStyle=""></VCardDiv>
        </div>
      </div>
    </main>
  );
}
