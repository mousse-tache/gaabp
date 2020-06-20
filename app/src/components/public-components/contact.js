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

    <div className="branches">

        <CardContent>
        <Typography color="textSecondary" gutterBottom>
        Par courriel
        </Typography>
        <Typography variant="h6">
        info@badenpowell.ca
        </Typography>
        </CardContent>

        <CardContent>
        <Typography color="textSecondary" gutterBottom>
        Par téléphone
        </Typography>
        <Typography variant="h6">
        514-316-9543
        </Typography>
        <Typography variant="h6">
        1-855-561-4159 (sans frais)
        </Typography>
        </CardContent>
    </div>

      </CardContent>
    </Card>
  </section>
)

export default Contact
