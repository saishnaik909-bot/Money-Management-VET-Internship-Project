import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite is the build tool (it bundles our files, like Webpack).
export default defineConfig({ plugins: [react()] });
