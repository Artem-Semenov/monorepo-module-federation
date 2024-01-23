import { useState } from "react";
import classes from "./App.module.scss";
import { Link, Outlet } from "react-router-dom";
import { shopRoutes } from "@packages/shared/src/routes/shop";
import { adminRoutes } from "@packages/shared/src/routes/admin";

type Props = {};

export const App = (props: Props) => {
  return (
    <>
      <div data-testid={"App.Data-testid"}>
        <h1>SHOP MODULE</h1>
        <div>123</div>
        <Link to={shopRoutes.second}>fo to second page</Link>
      </div>
      <Outlet />
    </>
  );
};
