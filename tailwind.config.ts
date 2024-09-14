import type { Config } from "tailwindcss";

const config: Config = {
    content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
    plugins: [],
    darkMode: "class",
    mode: "jit",
    corePlugins: {
        float: false,
        clear: false
    }
};
export default config;
