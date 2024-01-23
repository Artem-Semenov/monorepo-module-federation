import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import { BuildOptions } from "./types";
export const createDevServer = (
  options: BuildOptions
): DevServerConfiguration => ({
  port: options.port ?? 3000,
  open: true,
  historyApiFallback: true,
  hot: true
});
