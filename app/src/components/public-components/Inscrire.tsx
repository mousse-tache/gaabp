import { Box, Typography } from "@material-ui/core";
import Button from "../design-system/Button/Button";

const Inscrire = () => (
  <section>
    <div className="break" id="inscrire"></div>
    <div className="wrapper">
      <div>
        <Typography variant="h4">S'inscrire</Typography>
        <Typography>
          <Box component="span" lineHeight={2.5}>
            L'inscription pour les jeunes se fait directement auprès des
            groupes. Notre association offre une structure décentralisée pour
            nos groupes membres. Par le biais de nos règlements, de nos
            formations et de nos activités nationales, nous assurons une
            cohésion chez l'ensemble de nos membres, mais c'est dans vos
            localités que notre aventure se vie pleinement!
          </Box>
        </Typography>
        <Box component="h3" lineHeight={3}>
          <span>
            Si tu veux vivre une aventure incomparable, trouve un groupe et
          </span>
          <div>
            <a href="/groupes" target="_blank">
              <Button size="large">Inscris-toi</Button>
            </a>
          </div>
        </Box>
      </div>
    </div>
  </section>
);

export default Inscrire;
