import React from "react"
import { Card, CardContent, Typography } from "@material-ui/core"
const Contact = () => (
  <section>
    <div className="break" id="contact"></div>
    <Card>
      <CardContent>
      <Typography variant="h4" gutterBottom>
      Nous joindre
      </Typography>
        <Typography color="textSecondary" gutterBottom>
        Par courriel
        </Typography>
        <Typography variant="h6">
        info@badenpowell.ca
        </Typography>
      </CardContent>
    </Card>
  </section>
)

export default Contact
