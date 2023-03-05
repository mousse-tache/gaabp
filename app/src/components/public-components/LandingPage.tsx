import { useEffect, useState } from "react";

import About from "@aabp/components/public-components/About";
import Contact from "@aabp/components/public-components/Contact";
import FrontPageImage from "@aabp/components/public-components/FrontPageImage";
import Impliquer from "@aabp/components/public-components/Impliquer";
import Inscrire from "@aabp/components/public-components/Inscrire";
import { Typography } from "@material-ui/core";

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
        <Typography
          className="title-container full-bleed"
          variant="h3"
          gutterBottom
        >
          <div className="title-asso-logo">
            <img
              className="morelinks hidden-logo m-auto"
              width="80"
              src={Logo}
              alt="Logo AABP"
            />
            <div>
              <span>Association des aventuriers de Baden-Powell</span>
            </div>
          </div>
          <FrontPageImage />
        </Typography>
      </section>
      <About />
      <Inscrire />
      <Impliquer />
      <Contact />
    </>
  );
};

export default LandingPage;
