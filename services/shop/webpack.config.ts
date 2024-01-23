import path from "path";
import webpack from "webpack";
import {
  BuildMode,
  BuildOptions,
  BuildPaths,
  BuildPlatform,
  buildWebpack,
} from "@packages/build-config/src";
import packageJson from "./package.json";

interface EnvVariables {
  mode?: BuildMode;
  port?: number;
  analyzer?: boolean;
  platform?: BuildPlatform;
}

export default (env: EnvVariables) => {
  const paths: BuildPaths = {
    entry: path.resolve(__dirname, "src", "index.tsx"),
    output: path.resolve(__dirname, "build"),
    html: path.resolve(__dirname, "public", "index.html"),
    src: path.resolve(__dirname, "src"),
    public: path.resolve(__dirname, "public"),
  };

  const config: webpack.Configuration = buildWebpack({
    port: env.port ?? 3002,
    mode: env.mode ?? "development",
    paths,
    analyzer: env.analyzer ?? false,
    platform: env.platform ?? "desktop",
  });

  config.plugins.push(
    new webpack.container.ModuleFederationPlugin({
      name: "shop",
      filename: "remoteEntry.js",
      exposes: {
        "./Router": "./src/Router/Router.tsx",
      },
      shared: {
        ...packageJson.dependencies,
        react: {
          eager: true,
          //required version...
        },
        "react-router-dom": {
          eager: true,
        },
        "react-dom": {
          eager: true,
        },
      },
    })
  );

  return config;
};
