import type { Config } from "tailwindcss";

const config: Config = {
    content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
    plugins: [],
    darkMode: "class",
    purge: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
    mode: "jit"
};
export default config;
