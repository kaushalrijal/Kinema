import React from "react";

const Footer = () => {
  return (
    <footer className="w-full border-t border-gray-200 dark:border-darkborder bg-white dark:bg-darkbg py-8 mt-16">
      <div className="container text-center space-y-3">
        <b className="text-lg text-lightprimary dark:text-darkprimary">Disclaimer</b>
        <p className="text-sm text-gray-900 dark:text-darktext text-justify">
          Kinema operates strictly within the bounds of legality, serving solely as a platform that provides links to external sites. We do not host any films or media files on our servers. As such, Kinema disclaims responsibility for the accuracy, compliance, copyright, legality, and decency of the content accessible through linked sites. In the event of any legal concerns, we encourage individuals to reach out to the relevant media file owners or hosting sites for resolution.
        </p>
        <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <span className="text-justify w-full md:w-auto">Kinema &copy; {new Date().getFullYear()} Kaushal Rijal</span>
          <a
            href="https://github.com/kaushalrijal/kinema"
            target="_blank"
            rel="noopener noreferrer"
            className="text-lightprimary dark:text-darkprimary hover:underline"
          >
            Open Source
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
