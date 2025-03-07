const config = {
  verbose: true,
  rootDir: "./",
  collectCoverage: true,
  collectCoverageFrom: ["<rootDir>/**/*.js", "!**/node_modules/**"],
  testMatch: ["<rootDir>/tests/*"],
  coverageDirectory: "../coverage",
};

module.exports = config;
