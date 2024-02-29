import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        environment: "jsdom",
        setupFiles: ["./tests/setup.js"],
        testMatch: ["./**/*.test.js"],
        globals: true,
    },
});
