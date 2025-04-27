import type { Config } from "jest";
import { pathsToModuleNameMapper } from "ts-jest";
import { compilerOptions } from "./tsconfig.json";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "babel-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    ...pathsToModuleNameMapper(compilerOptions.paths || {}, {
      prefix: "<rootDir>/",
    }),
    "^constants/(.*)$": "<rootDir>/src/constants/$1",
    "^api/(.*)$": "<rootDir>/src/api/$1",
    "^utils/(.*)$": "<rootDir>/src/utils/$1",
    "^model/(.*)$": "<rootDir>/src/model/$1",
    "^store/(.*)$": "<rootDir>/src/store/$1",
    "^router/(.*)$": "<rootDir>/src/router/$1",
  },
};

export default config;
