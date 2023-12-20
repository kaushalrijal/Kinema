import Link from "next/link";
import bg from "../../../public/movieBackground.png";

export default function Hero() {
  return (
    <section
      className={`relative  bg-cover bg-center bg-no-repeat w-full font-medium   h-full pb-0 items-center justify-center float-right`}
      style={{ backgroundImage: `url(${bg.src})` }}
    >
      <div className={`absolute inset-0 bg-white/80`}></div>

      <div className="relative mx-auto max-w-full-xl px-4 py-32 sm:px-6 lg:flex lg:h-fit lg:items-center lg:px-8 ">
        <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
          <h1 className="text-3xl font-extrabold sm:text-5xl text-black">
            <strong className="block font-extrabold text-[#1100b3]">
              The Shawshank Redemption
            </strong>
          </h1>

          <p className="mt-4 max-w-lg sm:text-md/relaxed text-justify mx-auto text-black">
            Framed in the 1940s for the double murder of his wife and her lover,
            upstanding banker Andy Dufresne begins a new life at the Shawshank
            prison, where he puts his accounting skills to work for an amoral
            warden. During his long stretch in prison, Dufresne comes to be
            admired by the other inmates -- including an older prisoner named
            Red -- for his integrity and unquenchable sense of hope.
          </p>

          <div className="mt-8 flex gap-4 text-center justify-center gap:2 items-center py-auto flex-wrap">
            <Link
              href="https://youtu.be/NmzuHjWmXOc?si=lUZ5_94a-Mx4_ZDm"
              target="none"
            >
              <button className="bg-white px-4 py-3 text-primary rounded-md w-full">
                Watch Trailer
              </button>
            </Link>
            <Link href="/watch/movie">
              <button className="bg-primary px-4 py-3 text-white rounded-md w-full">
                Watch Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
