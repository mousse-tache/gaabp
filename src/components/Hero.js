import React from "react";

import logo from "../assets/logo.png";

const Hero = () => (
  <div className="text-center hero my-5">
    <img className="mb-3 app-logo" src={logo} alt="React logo" width="120" />
    <h1 className="mb-4">Portail des membres</h1>

    <p className="lead">
      Ceci est une application en développement ayant pour but de simplifier la gestion administrative pour les membres de l'AABP.
    </p>
  </div>
);

export default Hero;
