import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
    define: {
      "process.env.DATABASE_URL": JSON.stringify(env.DATABASE_URL),
      "process.env.UPSTASH_REDIS_REST_URL": JSON.stringify(env.UPSTASH_REDIS_REST_URL),
      "process.env.UPSTASH_REDIS_REST_TOKEN": JSON.stringify(env.UPSTASH_REDIS_REST_TOKEN),
      "process.env.GOOGLE_CLIENT_ID": JSON.stringify(env.GOOGLE_CLIENT_ID),
      "process.env.GOOGLE_CLIENT_SECRET": JSON.stringify(env.GOOGLE_CLIENT_SECRET),
      "process.env.GITHUB_CLIENT_ID": JSON.stringify(env.GITHUB_CLIENT_ID),
      "process.env.GITHUB_CLIENT_SECRET": JSON.stringify(env.GITHUB_CLIENT_SECRET)
    }
  }
});
