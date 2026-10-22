/** @type {import('jest').Config} */
export default {
  testEnvironment: "jsdom",
  roots: ["<rootDir>/src"],
  setupFilesAfterEnv: ["<rootDir>/src/__tests__/setup.ts"],
  testMatch: ["**/__tests__/**/*.test.{ts,tsx}"],
  transform: {
    // Compiled to CommonJS because Jest's ESM support is still experimental; Vite never sees this output.
    "^.+\\.(t|j)sx?$": [
      "@swc/jest",
      {
        jsc: {
          parser: { syntax: "typescript", tsx: true },
          transform: { react: { runtime: "automatic" } },
        },
        module: { type: "commonjs" },
      },
    ],
  },
  moduleNameMapper: {
    "\\.css$": "<rootDir>/src/__tests__/styleStub.ts",
  },
};
