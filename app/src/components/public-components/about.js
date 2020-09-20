import React from "react"
import { Typography, Card, CardContent, Box } from "@material-ui/core"
import CastorCard from "./branches/castor/castorCard"
import LouveteauxCard from "./branches/louveteaux/louveteauxCard"
import VerteCard from "./branches/verte/verteCard"
import RougeCard from "./branches/rouge/rougeCard"

const About = () => (
  <section>
    <div className="break" id="about"></div>
    <Card className="about">
      <CardContent>
      <Typography variant="h4" gutterBottom>
      Qui sommes-nous
      </Typography>
        <Typography>
        Nous sommes un mouvement scout traditionnel d’éducation pour et par les jeunes ayant comme objectif la formation de meilleurs citoyens.
        <Box component="span" lineHeight={2}>
        L'Association des aventuriers de Baden-Powell (AABP) a été fondée en 2007 à la suite de la fusion de l'Association des Éclaireurs Baden-Powell AEBP, (1973 à 2007) et de l'Association Québécoise des Aventuriers de Brownsea, (1991 à 2007). C'est dans le but de sauvegarder et promouvoir certaines méthodes et approches pédagogiques du scoutisme et du guidisme de souche traditionnelle que celle-ci fut fondée. L'AABP rassemble aujourd'hui près de 1200 membres au Québec et au Nouveau-Brunswick. L'Association projette de s'implanter dans les autres provinces canadiennes et partout en Amérique du Nord.
        </Box>
        <Box component="span" lineHeight={2}>
        La santé, la formation du caractère, la débrouillardise et l'esprit de service sont les quatre buts vers lesquels nous orientons toute l’approche éducative de notre association.</Box>
        </Typography>
      </CardContent>
    </Card>
    <div className="branches">
      <CastorCard />
      <LouveteauxCard />
      <VerteCard />
      <RougeCard />
    </div>
  </section>
)

export default About
