import React from "react";
import Image from "next/image";
import Link from "next/link";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About - Kinema",
  description: "About Kinema TV",
};

const Page = () => {
  return (
    <>
      <div className="w-fit h-auto bg-lightbg dark:bg-darkbg flex justify-center flex-col p-1 md:p-3 lg:p-8 mx-4 md:mx-2">
        <div className="items-center justify-center flex flex-col md:my-24 bg-lightbg dark:bg-darkbg">
          <h1 className="font-bold text-3xl md:text-5xl my-8 md:my-auto text-black dark:text-white">
            About
          </h1>
          <p className="text-md md:text-xl p-1 md:p-6 lg:p-8 text-justify text-black dark:text-white">
            "Welcome to Kinema! Step into a cinematic wonderland where the magic
            of movies unfolds. Immerse yourself in a vast collection ranging
            from timeless classics to the latest blockbuster hits, all available
            in a spectrum of qualities to suit your preferences. Language is no
            barrier here – subtitles in numerous languages ensure that everyone
            can connect with rich narratives. Our user-friendly platform is
            designed for seamless navigation, making the exploration of hidden
            gems a delightful experience. Kinema is not merely a destination;
            it's a vibrant community where movie enthusiasts converge. Share
            your favorite recommendations, engage in lively discussions, and
            discover new films that resonate with your taste. Join us in
            celebrating the diverse and enchanting world of cinema – your ticket
            to the magic of film awaits at Kinema!"
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 w-fit justify-between py-6 gap-2 md:p-6 ">
          <div className="border py-4 px-2 md:px-3 lg:px-8 rounded-md dark:bg-slate-950">
            <h1 className="text-2xl font-semibold text-center my-8 text-black dark:text-white">
              About the Creator
            </h1>
            <Link href="https://kaushalrijal.com.np" target="none">
              <div className="flex items-center gap-4 group">
                <Image
                  src="/profile.png"
                  alt="profile pic of the creator of this site"
                  height={48}
                  width={48}
                  className="bg-secondary contents-center rounded-full border-slate-500 border-2 group-hover:border-primary"
                  unoptimized
                ></Image>
                <div>
                  <h1 className="text-xl font-medium text-black dark:text-white">Kaushal Rijal</h1>
                  <h2 className="text-md text-black dark:text-white">Founder, Kinema</h2>
                </div>
              </div>
            </Link>
            <p className="text-base md:text-sm lg:text-base text-justify my-8 text-black dark:text-white">
              I created this movie streaming site to learn Next.js and put my
              newfound skills to the test. As a self-taught learner, I've tried
              watching tutorials, but it wasn't until I built a real project
              that things clicked. This site is the result of that effort. If
              you're interested in contributing to the project or have
              suggestions for improvements, I'd love to hear from you! Please
              don't ask me to add any movies. Reach out to me to collaborate,
              report bugs, or offer feedback. I'm open to input and excited to
              see where this project takes us. Let's make it better together!
            </p>
          </div>
          <div className="border py-4 px-2 md:px-8 rounded-md dark:bg-slate-950">
            <h1 className="text-2xl font-semibold text-center my-8 text-black dark:text-white">
              Get in Touch
            </h1>
            <form className="space-y-4">
              <label className="block">
                <span className="text-md text-gray-600 ">Name</span>
                <input
                  className="p-2 mt-1 block w-full rounded-md bg-gray-100 dark:bg-gray-800 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                  placeholder="Your name"
                  type="text"
                />
              </label>
              <label className="block">
                <span className="text-md text-black dark:text-white">Subject</span>
                <input
                  className="p-2 mt-1 block w-full rounded-md bg-gray-100 dark:bg-gray-800  border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                  placeholder="Subject"
                  type="text"
                />
              </label>
              <label className="block">
                <span className="text-md text-gray-600">Email</span>
                <input
                  className="p-2 mt-1 block w-full rounded-mdbg-gray-100 dark:bg-gray-800  border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                  placeholder="Your email"
                  type="email"
                />
              </label>
              <label className="block">
                <span className="text-md text-gray-600">Message</span>
                <textarea
                  className="p-2 mt-1 block w-full rounded-md bg-gray-100 dark:bg-gray-800  border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                  placeholder="Your message"
                />
              </label>
              <button
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-lightprimary dark:bg-darkprimary hover:bg-gray-800"
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
