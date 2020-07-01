import React, { Suspense} from "react"
import Layout from "../components/public-components/layout"
import About from "../components/public-components/about"
import Inscrire from "../components/public-components/inscrire"
import Impliquer from "../components/public-components/impliquer"
import Contact from "../components/public-components/contact"
import CssBaseline from '@material-ui/core/CssBaseline';
import ImageCarousel from  "../components/public-components/imageCarousel"
import Loading from "../components/loading/loading"

const IndexPage = () => (
  <Suspense fallback={Loading}>
    <CssBaseline />
    <Layout>  
      <section name="home" className="sitename">
      <h1>L'Association des Aventuriers de Baden-Powell</h1>
      {ImageCarousel()}
      </section>
      <About/>
      <Inscrire />
      <Impliquer />
      <Contact />    
    </Layout>
  </Suspense>
)
 


export default IndexPage