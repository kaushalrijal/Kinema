import { ListItemSecondaryAction } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <div className="w-screen h-lg justify-center items-center p-4 pr-8">
      <b>Disclaimer</b>
      <p className="text-justify">
        Kinema meticulously aligns its operations with established legal
        frameworks, functioning exclusively as a conduit to curated external
        sites. Our infrastructure deliberately refrains from hosting or
        retaining any films or media files. It is crucial to emphasize that
        Kinema absolves itself of any responsibility regarding the accuracy,
        compliance, copyright, legality, or decency of content disseminated
        through linked sites. In instances of legal inquiries, we strongly
        advocate for the methodical engagement with the proprietors of media
        files or hosting entities, exemplifying our commitment to a
        sophisticated and principled resolution process.
      </p>
      <br />
      Kinema | &copy; 2023 Kaushal Rijal
    </div>
  );
};

export default Footer;
