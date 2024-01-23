import { useState } from "react";
import classes from "./App.module.scss";
import { Link, Outlet } from "react-router-dom";
import { UserCard } from "@packages/shared/src/components/UserCard";

type Props = {};

export const App = (props: Props) => {
  return (
    <>
      <div data-testid={"App.Data-testid"}>
        <h1>ADMIN MODULE</h1>
      </div>
      <Outlet />
      <UserCard username={"FROM ADMIN"} />
    </>
  );
};
