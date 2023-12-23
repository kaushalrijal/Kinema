import { getPopularMovies } from "@/utils/request";
import bg from "../../../public/collage.jpg";
import { PlayArrow } from "@mui/icons-material";
import Link from "next/link";

export default async function Hero() {
  const suggested = await getPopularMovies();
  const random = suggested[Math.floor(Math.random() * 20)];
  return (
    <section
      className={`relative  bg-cover bg-center bg-no-repeat w-full font-medium h-max-screen h-full pb-0 items-center justify-center`}
      style={{
        backgroundImage: `url(https://www.themoviedb.org/t/p/original/${random.backdrop_path})`,
      }}
    >
      <div className={`absolute inset-0 bg-white/60`}></div>

      <div className="relative mx-auto max-w-full-xl px-4 py-32 sm:px-6 lg:flex lg:h-fit lg:items-center lg:px-8 ">
        <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
          <h1 className="text-4xl font-extrabold md:text-5xl text-black">
            <strong className="block font-extrabold text-[#1100b3] font-[oswald]">
              {random.original_title}
            </strong>
          </h1>

          <p className="mt-4 max-w-lg sm:text-md/relaxed text-justify mx-auto text-black">
            {random.overview}
          </p>

          <Link href={`/watch/movie/${random.id}`}>
            <div className="mt-8 flex gap-4 text-center justify-center gap:2 items-center mx-8 py-auto flex-wrap">
              <button className="block w-full rounded bg-[#1100b3] px-12 py-3 mt-3 lg:my-0 text-sm font-medium text-white shadow focus:outline-none focus:ring sm:w-auto placeholder:text-slate-100">
                <PlayArrow />
                Watch Now
              </button>

              <input
                type="button"
                value="Read More"
                className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-[#1100b3] shadow-sm hover:shadow-black  focus:outline-none focus:ring sm:w-auto"
              />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
