import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */

const mode = process.env.NODE_ENV || "development";

const isDev = mode === "development";
console.log("mode ---------------> ", mode);

const nextConfig = {
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        config.plugins.push(
            new webpack.DefinePlugin({
                __IS_DEV__: JSON.stringify(isDev)
            })
        );
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"]
        });
        if (!isServer) {
            config.optimization.usedExports = true;
        }
        return config
    },
    sassOptions: {
        includePaths: [path.join(__dirname, "styles")]
    }
};

export default nextConfig;
