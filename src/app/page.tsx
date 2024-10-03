import Hero from "./components/hero";
import HCardDiv from "./components/cardCollectionH";
import VCardDiv from "./components/cardCollectionV";
import CardsGrid from "./components/cardsGrids";


export default function Home() {
  return (
    <main className="dark:bg-darkbg bg-lightbg ">
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
