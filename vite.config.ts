/* eslint-disable @typescript-eslint/no-var-requires */
import { defineConfig, PluginOption } from "vite";
import react from "@vitejs/plugin-react";
import { createHtmlPlugin } from "vite-plugin-html";
import * as fs from "fs";
import path from "path";
import dns from "dns";

export default defineConfig(async ({ mode }) => {
    const ENV_PATH = path.resolve(__dirname, `./env_${mode}.json`);
    const ENV_CONFIG = JSON.parse(fs.readFileSync(ENV_PATH, "utf-8"));
    dns.setDefaultResultOrder("verbatim");

    const plugins: PluginOption[] = [
        react(),
        createHtmlPlugin({
            inject: {
                data: {
                    APP_VERSION: require("./package.json").version,
                },
            },
        }),
    ];

    return {
        mode,
        plugins,
        server: {
            port: 5025,
            open: true,
        },
        define: {
            "process.env": {
                ...ENV_CONFIG,
            },
        },
        esbuild: {
            treeShaking: true,
        },
    };
});
