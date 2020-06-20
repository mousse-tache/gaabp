import React from "react"
import { Typography, Card, CardContent, CardMedia } from "@material-ui/core"

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
        </Typography>
        <Typography>
        L'Association des aventuriers de Baden-Powell (AABP) a été fondée en 2007 à la suite de la fusion de l'Association des Éclaireurs Baden-Powell AEBP, (1973 à 2007) et de l'Association Québécoise des Aventuriers de Brownsea, (1991 à 2007). C'est dans le but de sauvegarder et promouvoir certaines méthodes et approches pédagogiques du scoutisme et du guidisme de souche traditionnelle que celle-ci fut fondée. L'AABP rassemble aujourd'hui près de 1200 membres au Québec et au Nouveau-Brunswick. L'Association projette de s'implanter dans les autres provinces canadiennes et partout en Amérique du Nord.
        </Typography>
        <Typography>
        La santé, la formation du caractère, la débrouillardise et l'esprit de service sont les cinq buts vers lesquels nous orientons toute l’approche éducative de notre association.
        </Typography>
      </CardContent>
    </Card>
    <div className="branches">
      <Card className="branchecard bleu">
        <CardContent>
          <Typography>
            Les Castors
          </Typography>
          <Typography color="textSecondary">Pour les 7-9 ans</Typography>
        </CardContent>
        <CardMedia className="bleu"></CardMedia>
      </Card>
      <Card className="branchecard jaune">
        <CardContent>
          <Typography>
            Les Louveteaux
          </Typography>
          <Typography color="textSecondary">Pour les 9-12 ans</Typography>
        </CardContent>
        <CardMedia className="jaune"></CardMedia>
      </Card>
      <Card className="branchecard vert">
        <CardContent>
          <Typography>
            Les Guides et Éclaireurs
          </Typography>
          <Typography color="textSecondary">Pour les 12-17 ans</Typography>
        </CardContent>
        <CardMedia className="vert"></CardMedia>
      </Card>
      <Card className="branchecard rouge">
        <CardContent>
          <Typography>
            La Route
          </Typography>
          <Typography color="textSecondary">Pour les 17 ans et plus</Typography>
        </CardContent>
        <CardMedia className="rouge"></CardMedia>
      </Card>
    </div>
  </section>
)

export default About
