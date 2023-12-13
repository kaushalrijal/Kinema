import { ListItemSecondaryAction } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <div className="w-screen h-lg justify-center items-center p-4 pr-8">
      <b>Disclaimer</b>
      <p className="text-justify">
        Kinema operates strictly within the bounds of legality, serving solely
        as a platform that provides links to external sites. We do not host any
        films or media files on our servers. As such, Kinema disclaims
        responsibility for the accuracy, compliance, copyright, legality, and
        decency of the content accessible through linked sites. In the event of
        any legal concerns, we encourage individuals to reach out to the
        relevant media file owners or hosting sites for resolution
      </p>
      <br />
      Kinema | &copy; 2023 Kaushal Rijal
    </div>
  );
};

export default Footer;
