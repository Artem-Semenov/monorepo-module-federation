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
  ADMIN_REMOTE_URL: string;
  SHOP_REMOTE_URL: string;
}

export default (env: EnvVariables) => {
  const paths: BuildPaths = {
    entry: path.resolve(__dirname, "src", "index.tsx"),
    output: path.resolve(__dirname, "build"),
    html: path.resolve(__dirname, "public", "index.html"),
    src: path.resolve(__dirname, "src"),
    public: path.resolve(__dirname, "public"),
  };

  const ADMIN_REMOTE_URL = env.ADMIN_REMOTE_URL ?? "http://localhost:3001";
  const SHOP_REMOTE_URL = env.SHOP_REMOTE_URL ?? "http://localhost:3002";

  const config: webpack.Configuration = buildWebpack({
    port: env.port ?? 3000,
    mode: env.mode ?? "development",
    paths,
    analyzer: env.analyzer ?? false,
    platform: env.platform ?? "desktop",
  });

  config.plugins.push(
    new webpack.container.ModuleFederationPlugin({
      name: "host",
      filename: "remoteEntry.js",
      remotes: {
        shop: `shop@${SHOP_REMOTE_URL}/remoteEntry.js`,
        admin: `admin@${ADMIN_REMOTE_URL}/remoteEntry.js`,
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
