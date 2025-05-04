import { Dialog, IconButton, Typography } from "@material-ui/core";

import Card from "@aabp/components/design-system/Card/Card";
import CloseIcon from "@aabp/components/design-system/Icons/CloseIcon";

const BrancheModal = ({
  title,
  children,
  color,
  open,
  onClose,
}: {
  title: string
  open: boolean
  color: string
  children: React.ReactNode
  onClose: () => void
}): React.ReactNode => {
  return (
    <Dialog
      className="branche-modal"
      open={open}
      onClose={onClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Card className={color}>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
        <div className="p-3">
          <Typography variant="h5">{title}</Typography>
        </div>
        {children}
      </Card>
    </Dialog>
  );
};

export default BrancheModal;
