import React, { useEffect, useState } from "react";

import { Typography } from "@material-ui/core";
import About from "@aabp/components/public-components/About";
import Inscrire from "@aabp/components/public-components/Inscrire";
import Impliquer from "@aabp/components/public-components/Impliquer";
import Contact from "@aabp/components/public-components/Contact";
import ImageCarousel from "@aabp/components/public-components/ImageCarousel";
import Covid19 from "@aabp/components/public-components/mesures-sanitaires/Covid19";

import LogoSpinner from "@aabp/components/spinner/LogoSpinner";
import Logo from "@aabp/images/Logo_AABP.png";

const LandingPage = () => {
    const [init, setInit] = useState(false);

    useEffect(() => {
        setInit(true);
    }, []);

    if (!init) {
        return (
            <h4> 
                <LogoSpinner />
            </h4>
        );
    }

    return (
        <>
            <section name="home" className="sitename anchor">
              <Typography className="title-container" variant="h4" gutterBottom> 
                <img className="morelinks hidden-logo" src={Logo} alt="Logo AABP"/>
                <span>Association des aventuriers de Baden-Powell</span>
              </Typography>
            <Covid19 />
            <ImageCarousel />
            </section>
            <About/>
            <Inscrire />
            <Impliquer />
            <Contact />    
        </>
      );
};

export default LandingPage;