import { defineConfig, loadEnv } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { localVercelApi } from "./local-api-plugin.js";

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''));

  return {
    plugins: [
      tailwindcss(),
      localVercelApi()
    ],
  };
});
