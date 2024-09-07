import type { Config } from "tailwindcss";

const config: Config = {
    purge: ["./src/**/*.{js,ts,jsx,tsx}"],
    content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
    plugins: [],
    darkMode: "class"
};
export default config;
