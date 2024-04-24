import { Link } from "gatsby";

import HelpIcon from "@aabp/components/design-system/Icons/HelpIcon";
import Login from "@aabp/login/login";

const LoginPage = (): React.ReactNode => {
  return (
    <>
      <Login />
      <Link to="/aide" target="_blank" className="flex flex-col items-center">
        <HelpIcon />
        <h3>Centre d'aide</h3>
      </Link>
    </>
  );
};

export default LoginPage;
