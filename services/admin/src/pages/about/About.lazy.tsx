import { lazy } from "react";

type Props = {};
export const LazyAbout = lazy(() => import("./About"));
