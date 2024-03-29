import { Box, Typography } from "@material-ui/core";
import { Helmet } from "react-helmet";
import Button from "../design-system/Button/Button";

const Impliquer = (): React.ReactNode => {
  return (
    <section className="anchor">
      <Helmet>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </Helmet>
      <div className="break" id="impliquer"></div>
      <div className="wrapper">
        <div>
          <Typography variant="h4">S'impliquer</Typography>
          <Typography>
            <Box component="span" lineHeight={2.5}>
              L'Association des Aventuriers de Baden-Powell est constamment à la
              recherche de bénévoles pour s'occuper de nos aventuriers. Pour ce
              faire, il y aura vérification des antécédents judiciaires de
              l'intéressé pour s'assurer qu'il ne présente pas de risque.
              L'intéressé devra également être en contact avec le groupe dans
              lequel il désire s'impliquer et ses membres pourront le guider
              dans le processus. Il n'est pas nécessaire d'avoir été aventurier
              par le passé pour s'impliquer, il faut seulement avoir le désir de
              donner de son temps pour contribuer au développement des jeunes
              que nous accompagnons.
            </Box>
          </Typography>

          <Typography component="div">
            <Box component="h3" lineHeight={2}>
              <span>
                Si tu veux faire la différence pour nos jeunes, trouve un groupe
                et{" "}
              </span>
              <a href="/groupes" target="_blank">
                <Button color="secondary" size="large">
                  Implique-toi
                </Button>
              </a>
            </Box>
          </Typography>
        </div>
      </div>
    </section>
  );
};

export default Impliquer;
