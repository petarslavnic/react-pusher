const presetTypescriptOptions = {
  isTSX: true,
  allExtensions: true,
};

const sharedPresets = [
  ["@babel/preset-react"],
  ["@babel/preset-typescript", presetTypescriptOptions],
];

const shared = [];
const sharedPlugins = [];
const plugins = [...sharedPlugins, "@babel/plugin-proposal-object-rest-spread"];

module.exports = {
  env: {
    test: {
      plugins,
      presets: [["@babel/preset-env"], ...sharedPresets],
    },
    esmUnbundled: {
      ...shared,
      plugins: [
        ...sharedPlugins,
        ["@babel/plugin-transform-runtime", { useESModules: true }],
      ],
      presets: [
        [
          "@babel/preset-env",
          {
            modules: false,
            loose: true,
          },
        ],
        ...sharedPresets,
      ],
    },
    cjs: {
      ...shared,
      plugins,
      presets: [
        [
          "@babel/preset-env",
          {
            modules: "commonjs",
          },
        ],
        ...sharedPresets,
      ],
    },
    storybook: {
      ignore: ["**/*.test.js", "**/*.test.tsx"],
      plugins,
      presets: [["@babel/preset-env"], ...sharedPresets],
    },
    production: {
      ...shared,
      plugins,
      presets: [["@babel/preset-env"], ...sharedPresets],
    },
  },
};
