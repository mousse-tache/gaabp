import Accordion from "../design-system/Collapsible/Accordion";
import List from "../design-system/List/List";
import ListItem from "../design-system/List/ListItem";

const Bottin = (): React.ReactNode => {
  return (
    <div className="p-5">
      <Accordion header="Permis de camp">
        <List>
          Vous devez envoyer votre demande de permis de camp à votre branche,
          votre chef de groupe et info@badenpowell.ca
          <ListItem>Castors: bleu@badenpowell.ca</ListItem>
          <ListItem>
            Louveteaux/Louvettes/Jeannettes: jaune@badenpowell.ca
          </ListItem>
          <ListItem>Guides/Éclaireurs: vert@badenpowell.ca</ListItem>
          <ListItem>Routiers/Guides aînées: rouge@badenpowell.ca</ListItem>
        </List>
      </Accordion>
      <Accordion header="Cotisation">
        info@badenpowell.ca ou gestion@badenpowell.ca
      </Accordion>
      <Accordion header="Méthodologie">commissariat@badenpowell.ca</Accordion>
      <Accordion header="Groupes">groupe@badenpowell.ca</Accordion>
      <Accordion header="Initiatives jeunesses">
        jeunesse@badenpowell.ca
      </Accordion>
      <Accordion header="Spiritualité">
        spiritualite@badenpowell.CampClient
      </Accordion>

      <Accordion header="Éthique et déontologie">
        ethique@badenpowell.ca
      </Accordion>
      <Accordion header="Dénonciations">
        ethique@badenpowell.ca ou presidence@badenpowell.ca
      </Accordion>
      <Accordion header="Le site web">fbrobillard@gmail.com</Accordion>
      <Accordion header="Toute autre question">info@badenpowell.ca</Accordion>
    </div>
  );
};

export default Bottin;
