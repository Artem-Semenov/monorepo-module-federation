import webpack from "webpack";
import { createDevServer } from "./buildDevServer";
import { buildLoaders } from "./buildLoaders";
import { buildPlugins } from "./buildPlugins";
import { buildREsolvers } from "./buildResolvers";
import { BuildOptions } from "./types";

export function buildWebpack(options: BuildOptions): webpack.Configuration {
  const { mode, paths } = options;
  const isDev = options.mode === "development";

  return {
    mode: mode ?? "development",
    entry: {
      index: paths.entry,
    },
    output: {
      path: paths.output,
      filename: "[name].[contenthash].bundle.js",
      clean: true,
    },
    plugins: buildPlugins(options),
    module: {
      rules: buildLoaders(options),
    },
    resolve: buildREsolvers(options),
    devtool: isDev ? "inline-source-map" : "source-map",
    devServer: isDev ? createDevServer(options) : undefined,
  };
}
