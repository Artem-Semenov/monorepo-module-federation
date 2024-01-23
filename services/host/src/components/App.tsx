import classes from "./App.module.scss";
import { Link, Outlet } from "react-router-dom";
import { shopRoutes } from "@packages/shared/src/routes/shop";
import { adminRoutes } from "@packages/shared/src/routes/admin";

type Props = {};

export const App = (props: Props) => {
  return (
    <>
      <div data-testid={"App.Data-testid"}>
        <h1>PAGE</h1>
        <div className={classes.linksWrapper} data-testid={"App.Platform.test"}>
          <Link to={"/"}>Main</Link>
          <Link to={adminRoutes.about}>About</Link>
          <Link to={shopRoutes.main}>Shop</Link>
        </div>
      </div>
      <Outlet />
    </>
  );
};
