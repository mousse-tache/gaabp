import React from "react"
import { Card, CardContent, Typography } from "@material-ui/core"

const Inscrire = () => (
  <section>
    <div className="break" id="inscrire"></div>
    <Card>
      <CardContent>
        <Typography variant="h4">
          S'inscrire
        </Typography>
        <Typography>L'inscription pour les jeunes se fait directement auprès des groupes scouts. Nous vous invitons à contacter vos groupes locaux afin d'obtenir plus d'informations quant à l'horaire de l'année et les détails relatifs à l'inscription. Si vous ne connaissez pas de groupe dans votre région, vous pouvez consulter la liste de nos groupes.</Typography>
      </CardContent>
    </Card>
  </section>
)

export default Inscrire
