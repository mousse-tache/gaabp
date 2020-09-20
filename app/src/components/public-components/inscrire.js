import React from "react"
import { Card, CardContent, Typography, Box, Button } from "@material-ui/core"

const Inscrire = () => (
  <section>
    <div className="break" id="inscrire"></div>
    <Card>
      <CardContent>
        <Typography variant="h4">
          S'inscrire
        </Typography>
        <Box lineHeight={2}>L'inscription pour les jeunes se fait directement auprès des groupes scouts. Notre association offre une structure décentralisée pour nos groupes membres. Par le biais de nos règlements, de nos formations et de nos activités nationales, nous assurons une cohésion chez l'ensemble de nos membres, mais c'est dans vos localités que notre scoutisme se vie pleinement!</Box>

        <Box component="h3" lineHeight={2}>
            Si tu veux vivre une aventure incomparable, trouve un groupe et
        </Box>

        <Box component="h3" lineHeight={2}>
            <a href="/groupes" target="_blank">
              <Button variant="contained" color="primary" size="large">
                Inscris-toi
              </Button>
            </a>
          </Box>
      </CardContent>
    </Card>
  </section>
)

export default Inscrire
