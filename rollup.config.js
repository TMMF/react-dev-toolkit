import typescript from "rollup-plugin-typescript2"
import babel from "@rollup/plugin-babel"
import { terser } from "rollup-plugin-terser"
import pkg from "./package.json"

export default [
  // ES Modules
  {
    input: "src/index.ts",
    output: {
      file: pkg.module,
      format: "es",
    },
    plugins: [
      typescript({
        typescript: require("typescript"),
      }),
      babel({ extensions: [".ts"], babelHelpers: "bundled" }),
    ],
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {}),
      "react/jsx-runtime",
      "zustand/middleware",
    ],
  },

  // UMD
  {
    input: "src/index.ts",
    output: {
      file: pkg.main,
      format: "umd",
      name: "ReactDevToolkit",
      indent: false,
      globals: {
        react: "React",
        "react-dom": "ReactDOM",
        "react/jsx-runtime": "jsxRuntime",
        "styled-components": "styled",
      },
    },
    plugins: [
      typescript({
        typescript: require("typescript"),
      }),
      babel({
        extensions: [".ts"],
        exclude: "node_modules/**",
        babelHelpers: "bundled",
      }),
      terser(),
    ],
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {}),
      "react/jsx-runtime",
      "zustand/middleware",
    ],
  },
]
