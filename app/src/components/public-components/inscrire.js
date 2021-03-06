import React from "react"
import { Typography, Box, Button } from "@material-ui/core"

const Inscrire = () => (
  <section>
    <div className="break" id="inscrire"></div>
    <div className="wrapper">
      <div>
        <Typography variant="h4">
          S'inscrire
        </Typography>
        <Typography>  
          <Box component="span" lineHeight={2.5}>

              L'inscription pour les jeunes se fait directement auprès des groupes scouts. Notre association offre une structure décentralisée pour nos groupes membres. Par le biais de nos règlements, de nos formations et de nos activités nationales, nous assurons une cohésion chez l'ensemble de nos membres, mais c'est dans vos localités que notre scoutisme se vie pleinement!
            
          </Box>
        </Typography>
        <Box component="h3" lineHeight={3}>
          <span>
            Si tu veux vivre une aventure incomparable, trouve un groupe et
          </span>
          <a href="/groupes" target="_blank">
              <Button variant="contained" color="primary" size="large">
                Inscris-toi
              </Button>
            </a>
        </Box>
      </div>
    </div>
  </section>
)

export default Inscrire
