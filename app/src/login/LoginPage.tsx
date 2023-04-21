import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import { Link } from "gatsby";

import Login from "@aabp/login/login";

const LoginPage = (): React.ReactNode => {
  return (
    <>
      <Login />
      <Link to="/aide" target="_blank" className="flex flex-col items-center">
        <HelpOutlineIcon fontSize="large" label="bottin" />
        <h3>Centre d'aide</h3>
      </Link>
    </>
  );
};

export default LoginPage;
