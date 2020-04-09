import React from "react"
//import { Link} from "gatsby"
import Layout from "../components/layout"
import Home from "./home"
import Inscrire from "./inscrire"
import Impliquer from "./impliquer"
import Contact from "./contact"
import About from "./about"
import NotFound from "./404"

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

const IndexPage = () => (
  <Router>  
    <Layout>
      <Switch>
        <Route path="/" children={<Home />} />
        
        <Route path="/about" children={<About />} />
        
        <Route path="/inscrire" children={<Inscrire />} />
        
        <Route path="/impliquer" children={<Impliquer />} />
        
        <Route path="/contact" children={<Contact />}></Route>

        <Route children={<NotFound />} />
      </Switch>
    </Layout>
  </Router>
)

export default IndexPage
