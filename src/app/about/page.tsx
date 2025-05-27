import React from "react";
import Image from "next/image";
import Link from "next/link";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About - Kinema",
  description: "About Kinema TV",
};

export default function AboutPage() {
  return (
    <div className="container py-16 min-h-screen space-y-16">
      {/* About Kinema */}
      <section className="w-full space-y-6">
        <h1 className="section-title text-center">About Kinema</h1>
        <div>
          <p className="text-lg text-gray-900 dark:text-darktext text-left text-justify">
            Welcome to <span className="font-bold text-lightprimary dark:text-darkprimary">Kinema</span>! Step into a cinematic wonderland where the magic of movies unfolds. Immerse yourself in a vast collection ranging from timeless classics to the latest blockbuster hits, all available in a spectrum of qualities to suit your preferences. Subtitles in numerous languages ensure everyone can connect with rich narratives. Our user-friendly platform is designed for seamless navigation, making the exploration of hidden gems a delightful experience. Kinema is not merely a destination; it's a vibrant community where movie enthusiasts converge. Share your favorite recommendations, engage in lively discussions, and discover new films that resonate with your taste. Join us in celebrating the diverse and enchanting world of cinema – your ticket to the magic of film awaits at Kinema!
          </p>
        </div>
      </section>

      {/* About the Creator & Contact */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* About the Creator */}
        <div className="rounded-xl border border-gray-200 dark:border-darkborder bg-white dark:bg-darkbg p-8 flex flex-col space-y-6 shadow-sm">
          <h2 className="text-2xl font-semibold mb-2 text-textprimary dark:text-darktext text-center">About the Creator</h2>
          <Link href="https://kaushalrijal.com.np" target="_blank" className="flex items-center gap-4 group text-left">
            <Image
              src="/profile.png"
              alt="Profile pic of the creator of this site"
              height={64}
              width={64}
              className="rounded-full border-2 border-lightprimary dark:border-darkprimary group-hover:scale-105 transition-transform"
              unoptimized
            />
            <div className="text-left">
              <h3 className="text-xl font-medium text-gray-900 dark:text-darktext">Kaushal Rijal</h3>
              <p className="text-md text-gray-500 dark:text-gray-400">Founder, Kinema</p>
            </div>
          </Link>
          <p className="text-base text-gray-900 dark:text-darktext text-justify">
            I created this movie streaming site to learn Next.js and put my newfound skills to the test. As a self-taught learner, I've tried watching tutorials, but it wasn't until I built a real project that things clicked. This site is the result of that effort. If you're interested in contributing to the project or have suggestions for improvements, I'd love to hear from you! Please don't ask me to add any movies. Reach out to me to collaborate, report bugs, or offer feedback. I'm open to input and excited to see where this project takes us. Let's make it better together!
          </p>
        </div>
        {/* Contact Form */}
        <div className="rounded-xl border border-gray-200 dark:border-darkborder bg-white dark:bg-darkbg p-8 shadow-sm">
          <h2 className="text-2xl font-semibold mb-6 text-textprimary dark:text-darktext text-center">Get in Touch</h2>
          <form className="space-y-4">
            <label className="block text-left">
              <span className="text-md text-gray-900 dark:text-darktext">Name</span>
              <input
                className="p-2 mt-1 block w-full rounded-md bg-secondary dark:bg-darkbgSecondary border-transparent focus:border-lightprimary dark:focus:border-darkprimary focus:bg-white focus:ring-0 text-gray-900 dark:text-darktext"
                placeholder="Your name"
                type="text"
              />
            </label>
            <label className="block text-left">
              <span className="text-md text-gray-900 dark:text-darktext">Subject</span>
              <input
                className="p-2 mt-1 block w-full rounded-md bg-secondary dark:bg-darkbgSecondary border-transparent focus:border-lightprimary dark:focus:border-darkprimary focus:bg-white focus:ring-0 text-gray-900 dark:text-darktext"
                placeholder="Subject"
                type="text"
              />
            </label>
            <label className="block text-left">
              <span className="text-md text-gray-900 dark:text-darktext">Email</span>
              <input
                className="p-2 mt-1 block w-full rounded-md bg-secondary dark:bg-darkbgSecondary border-transparent focus:border-lightprimary dark:focus:border-darkprimary focus:bg-white focus:ring-0 text-gray-900 dark:text-darktext"
                placeholder="Your email"
                type="email"
              />
            </label>
            <label className="block text-left">
              <span className="text-md text-gray-900 dark:text-darktext">Message</span>
              <textarea
                className="p-2 mt-1 block w-full rounded-md bg-secondary dark:bg-darkbgSecondary border-transparent focus:border-lightprimary dark:focus:border-darkprimary focus:bg-white focus:ring-0 text-gray-900 dark:text-darktext"
                placeholder="Your message"
                rows={4}
              />
            </label>
            <button
              className="w-full py-2 px-4 rounded-md text-white font-semibold bg-lightprimary dark:bg-darkprimary hover:bg-blue-700 dark:hover:bg-[#d97c13] transition-colors"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
