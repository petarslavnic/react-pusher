module.exports = {
  roots: ["test"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testMatch: ["<rootDir>/(test/**/*.test.(ts|tsx))"],
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
  snapshotSerializers: ["<rootDir>/node_modules/enzyme-to-json/serializer"],
  setupFilesAfterEnv: ["<rootDir>/test/setup.ts"],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  testEnvironment: "jsdom",
};
