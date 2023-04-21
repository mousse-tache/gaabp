import { Dialog, IconButton, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

import Card from "@aabp/components/design-system/Card/Card";

const BrancheModal = ({
  title,
  children,
  color,
  open,
  handleClose,
}: {
  title: string
  open: boolean
  color: string
  children: React.ReactNode
  handleClose: () => void
}): React.ReactNode => {
  return (
    <Dialog
      className="branche-modal"
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Card className={color}>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
        <div className="p-3">
          <Typography variant="h5">{title}</Typography>
        </div>

        <div className="p-3">
          <Typography>
            Ils sont amenés à apprendre la vie en groupe par le biais des
            aventures de Pistache le castor et de ses amis de la nature.
          </Typography>
        </div>
        {children}
      </Card>
    </Dialog>
  );
};

export default BrancheModal;
