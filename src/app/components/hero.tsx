import { getTrending } from "@/utils/request";
import { PlayArrow } from "@mui/icons-material";
import Link from "next/link";

const Hero = async () => {
  let suggested = await getTrending();
  let random = suggested[Math.floor(Math.random() * 20)];
  return (
    <section
      className={`relative  bg-cover bg-center bg-no-repeat w-full font-medium h-max-screen h-full pb-0 items-center justify-center`}
      style={{
        backgroundImage: `url(https://www.themoviedb.org/t/p/original/${random.backdrop_path})`,
      }}
    >
      <div className={`absolute inset-0 dark:bg-black/50 bg-white/50`}></div>

      <div className="relative mx-auto max-w-full-xl px-4 py-32 sm:px-6 lg:flex lg:h-fit lg:items-center lg:px-8 ">
        <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
          <h1 className="text-4xl font-extrabold md:text-5xl text-black">
            <strong className="block font-extrabold text-lightprimary dark:text-darkprimary font-[oswald]">
              {random.media_type === "movie" ? random.title : random.name}
            </strong>
          </h1>
          <p className="flex justify-center gap-3 my-6">
            <span className="items-center justify-center py-auto flex p-2 text-sm rounded-xl bg-lightprimary dark:bg-darkprimary dark:border-darkprimary border-lightprimary text-white dark:text-black">
              {random.media_type.toUpperCase()}
            </span>
            <span className="items-center justify-center p-2 text-sm rounded-xl border-2 border-primary dark:border-darkprimary border-lightprimary text-lightprimary dark:text-darkprimary">
              {random.media_type === "movie"
                ? random.release_date.slice(0, 4)
                : random.first_air_date.slice(0, 4)}
            </span>
            <span className="items-center justify-center p-2 text-sm rounded-xl border-2 border-primary dark:border-darkprimary border-lightprimary text-lightprimary dark:text-darkprimary">
              {random.original_language.toUpperCase()}
            </span>
            <span className="items-center justify-center p-2 text-sm rounded-xl border-2 border-light dark:border-darkprimary border-lightprimary text-lightprimary dark:text-darkprimary">
              {random.vote_average.toFixed(1)}
            </span>
          </p>
          <p className="mt-4 max-w-lg sm:text-md/relaxed text-justify mx-auto dark:border-darkprimary border-lightprimary text-black dark:text-white">
            {random.overview}
          </p>

          <Link
            href={`/watch/${
              random.media_type === "movie" ? "movie" : "series"
            }/${random.id}`}
          >
            <div className="mt-8 flex gap-4 text-center justify-center gap:2 items-center mx-8 py-auto flex-wrap">
              <button className="block w-full rounded bg-lightprimary dark:bg-darkprimary px-12 py-3 mt-3 lg:my-0 text-sm font-medium text-white dark:text-white shadow focus:outline-none focus:ring sm:w-auto placeholder:text-secondary hover:shadow-sm hover:shadow-black  ">
                <PlayArrow />
                Watch Now
              </button>

              <input
                type="button"
                value="Read More"
                className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-lightprimary dark:text-darkprimary shadow-sm hover:shadow-black  focus:outline-none focus:ring sm:w-auto"
              />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
