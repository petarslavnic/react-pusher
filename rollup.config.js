import peerDepsExternal from "rollup-plugin-peer-deps-external";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";

const config = {
  input: "./src/index.ts",
  output: [
    {
      file: "dist/index.js",
      format: "umd",
      name: "components",
      sourcemap: true,
    },
    {
      file: "dist/index.min.js",
      format: "umd",
      name: "components",
      sourcemap: true,
      plugins: [terser()],
    },
  ],
  plugins: [
    // Leave out third-party dependencies
    peerDepsExternal({ includeDependencies: true }),
    // Find third-party modules within `node_modules`
    nodeResolve({
      extensions: [".js", ".ts", ".tsx", ".css"],
    }),
    // Convert CommonJS modules into ES modules.
    commonjs(),
    // Compile the library's code into a format that is consumable by a wider set of browsers.
    // The library's code lives inside `.js`, `.jsx`, `.ts` and `.tsx` files.
    // Do not compile any files from`node_modules`.
    // The`runtime` helper makes Babel's injected helper code reusable for all modules,
    // which greatly reduces bundle size.
    babel({
      // babelHelpers: "runtime",
      babelHelpers: "bundled",
      exclude: "**/node_modules/**",
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    }),
  ],
};

export default config;
