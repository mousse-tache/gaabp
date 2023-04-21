import Logo from "@aabp/images/Logo_AABP.png";
import MenuIcon from "@material-ui/icons/Menu";
import Button from "../design-system/Button/Button";

const MenuButton = ({
  open,
  setOpen,
}: {
  open: boolean
  setOpen: (arg: boolean) => void
}): React.ReactNode => {
  return (
    <Button
      color="ghost"
      className="flex flex-initial flex-row max-w-fit flex-nowrap px-2 items-center"
      onClick={() => setOpen(!open)}
    >
      <img src={Logo} className="w-12" alt="Logo" />
      <MenuIcon className="mobile-only" />
    </Button>
  );
};

export default MenuButton;
