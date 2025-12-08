import React from "react";
import yeltuWebp from "../assets/logo.webp";   // <-- add to assets folder
import yeltuPng from "../assets/yeltu_logopng.png";

export default function LoadingOverlay() {
  return (
    <div className="loading-overlay">
      <picture>
        <source srcSet={yeltuWebp} type="image/webp" />
        <img
          src={yeltuPng}
          alt="Yeltu Logo Loading"
          className="loading-logo"
          width="180"
          height="180"
        />
      </picture>
    </div>
  );
}
