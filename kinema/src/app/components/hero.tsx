import bg from "../../../public/collage.jpg";


export default function Hero(props) {
  return (
    <section className={`relative  bg-cover bg-center bg-no-repeat w-screen font-medium   h-full pb-0 items-center justify-center`} style={{ backgroundImage: `url(${bg.src})`}}>
      <div className={  `absolute inset-0 bg-white/80`}></div>
    
      <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-fit lg:items-center lg:px-8 ">
        <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
          <h1 className="text-3xl font-extrabold sm:text-5xl text-black">
            Unlimited movies
            <strong className="block font-extrabold text-[#1100b3]">
              anytime, anywhere.
            </strong>
          </h1>

          <p className="mt-4 max-w-lg sm:text-xl/relaxed text-center mx-auto text-black">
            Kinema has a large collection of Movies and Web Series with limited
            ads and clean and simple UI.
          </p>

          <div className="mt-8 flex gap-4 text-center justify-center gap:2 items-center flex-wrap">
            <input
              type="search"
              className="block w-full rounded bg-[#1100b3] px-12 py-3 mt-3 lg:my-0 text-sm font-medium text-white shadow focus:outline-none focus:ring sm:w-auto placeholder:text-slate-100"
              placeholder="Enter a movie/series title"
            />

            <input
              type="submit"
              value="Search"
              className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-[#1100b3] shadow-sm hover:shadow-black  focus:outline-none focus:ring sm:w-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
