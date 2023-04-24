import { Typography } from "@material-ui/core";

import Card from "../design-system/Card/Card";

const Contact = (): React.ReactNode => (
  <section>
    <div className="break" id="contact"></div>
    <Card>
      <Typography variant="h4" gutterBottom>
        Nous joindre
      </Typography>
      <div className="flex flex-row w-full gap-10 justify-evenly">
        <div>
          <Typography color="textSecondary" gutterBottom>
            Par courriel
          </Typography>
          <Typography variant="h6">info@badenpowell.ca</Typography>
        </div>
        <div>
          <Typography color="textSecondary" gutterBottom>
            Par téléphone
          </Typography>
          <Typography variant="h6">514-316-9543</Typography>
          <Typography variant="h6">1-855-561-4159 (sans frais)</Typography>
        </div>
      </div>
    </Card>
  </section>
);

export default Contact;
