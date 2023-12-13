import React from "react";
import Image from "next/image";

const Page = () => {
  return (
    <>
      <div className="w-full h-auto bg-white flex justify-center flex-col p-8 mx-4">
        <div className="justify-center items-center flex flex-col">
          <h1 className="font-bold text-5xl">About</h1>
          <p className="text-xl p-8 text-center text-[#6b788b]">
            Welcome to Kinema, your ultimate cinematic escape where the magic of
            film unfolds. Immerse yourself in a curated collection ranging from
            timeless classics to the latest releases, all offered in a spectrum
            of qualities to suit your preferences. Language is no barrier here –
            subtitles for a multitude of languages ensure everyone can connect
            with the rich narratives. Our user-friendly platform is designed for
            seamless navigation, making the exploration of hidden gems a
            delightful experience. Kinema is not just a destination; it&apos;s a
            vibrant community where movie enthusiasts converge, sharing
            recommendations and engaging in discussions. Join us in celebrating
            the diverse and enchanting world of cinema – your ticket to the
            magic of film awaits.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 w-fit justify-between gap-2 p-6">
          <div className="border p-4 rounded-md ">
            <h1 className="text-2xl font-semibold text-center my-8">
              About the Creator
            </h1>
            <div className="flex items-center gap-4">
              <Image
                src="/profile.png"
                alt="Image of Kaushal The Great"
                height={48}
                width={48}
                className="bg-slate-100 contents-center rounded-full border-slate-500 border-2"
              ></Image>
              <div>
                <h1 className="text-xl font-medium">Kaushal Rijal</h1>
                <h2 className="text-md">Founder, Kinema</h2>
              </div>
            </div>
            <p className="text-lg text-justify my-8">
              Meet Kaushal Rijal, a creative mind who wears many hats. Whether
              he&apos;s simplifying your note-taking experience with Kodepad,
              automating your WhatsApp messages for convenience, or bringing
              people together through his Android chatting app, Khat,
              Kaushal&apos;s knack for practical solutions shines through. Not
              stopping there, he introduces you to Matthew, a digital assistant
              that not only understands what you&apos;re saying but also tackles
              those tricky math problems. And if that weren&apos;t enough,
              Kaushal flexes his artistic muscles with a flair for Photoshop.
              From coding to design, Kaushal&apos;s all about making things work
              seamlessly, adding a touch of innovation to your day-to-day. Stick
              around as he keeps bringing fresh ideas to life, one project at a
              time.
            </p>
          </div>
          <div className="border p-4 rounded-md">
            <h1 className="text-2xl font-semibold text-center my-8">
              Get in Touch
            </h1>
            <form className="space-y-4">
              <label className="block">
                <span className="text-md text-gray-600">Name</span>
                <input
                  className="p-2 mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                  placeholder="Your name"
                  type="text"
                />
              </label>
              <label className="block">
                <span className="text-md text-gray-600">Subject</span>
                <input
                  className="p-2 mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                  placeholder="Subject"
                  type="text"
                />
              </label>
              <label className="block">
                <span className="text-md text-gray-600">Email</span>
                <input
                  className="p-2 mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                  placeholder="Your email"
                  type="email"
                />
              </label>
              <label className="block">
                <span className="text-md text-gray-600">Message</span>
                <textarea
                  className="p-2 mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                  placeholder="Your message"
                />
              </label>
              <button
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800"
                type="submit"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
