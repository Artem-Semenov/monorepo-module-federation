import { lazy } from "react";

type Props = {};
export const LazyShop = lazy(() => import("./Shop"));
