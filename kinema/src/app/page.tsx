import Image from "next/image";
import logo from "./img/logo.png";
import background from "../../public/collage.jpg";
import walter from "../../public/brbad.jpg";
import Hero from "./components/hero";
import CardsFullDiv from "./components/cardCollectionFull";
import Footer from "./components/footer";
import Test from "./components/labalaba";
import { Fab } from "@mui/material";

const data = [
  {
    key: "1",
    title: "Oppenheimer",
    year: "2023",
    type: "Movie",
    runtime: "181m",
    img: "/posters/oppenheimer.jpg",
  },
  {
    key: "2",
    title: "Tenet",
    year: "2020",
    type: "Movie",
    runtime: "150m",
    img: "/posters/tenet.jpg",
  },
  {
    key: "3",
    title: "Dunkirk",
    year: "2017",
    type: "Movie",
    runtime: "107m",
    img: "/posters/dunkirk.jpg",
  },
  {
    key: "4",
    title: "Interstellar",
    year: "2014",
    type: "Movie",
    runtime: "169m",
    img: "/posters/interstellar.jpg",
  },
  {
    key: "5",
    title: "The Dark Knight Rises",
    year: "2012",
    type: "Movie",
    runtime: "165m",
    img: "/posters/darkknightrises.jpg",
  },
  {
    key: "6",
    title: "Inception",
    year: "2010",
    type: "Movie",
    runtime: "148m",
    img: "/posters/inception.jpg",
  },
  {
    key: "7",
    title: "The Dark Knight",
    year: "2008",
    type: "Movie",
    runtime: "152m",
    img: "/posters/darkknight.jpg",
  },
  {
    key: "8",
    title: "Batman Begins",
    year: "2005",
    type: "Movie",
    runtime: "140m",
    img: "/posters/batmanbegins.jpg",
  },
];

export default function Home() {
  return (
    <main className="overflow-hidden bg-white">
      <div className="flex flex-col w-screen md:h-16 h-auto bg-slate-100 md:flex-row justify-between px-8 items-center py-auto flex-wrap">
        <Image src={logo} alt="kinema logo" className={"h-[40px] w-auto"} />
        <div className="justify-between text-black gap-4 hidden md:flex">
          <a>Home</a>
          <a>Movies</a>
          <a>Shows</a>
          <a>About</a>
        </div>
      </div>
      <Hero image={background}></Hero>
      <CardsFullDiv section="Trending" data={data}></CardsFullDiv>
      <CardsFullDiv section="Latest Movies" data={data}></CardsFullDiv>
      <CardsFullDiv section="Latest Shows" data={data}></CardsFullDiv>
      <Footer></Footer>
    </main>
  );
}
