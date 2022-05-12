import typescript from "rollup-plugin-typescript2"
import babel from "@rollup/plugin-babel"
import dts from "rollup-plugin-dts"
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
        tsconfigOverride: {
          compilerOptions: {
            declaration: false,
          },
        },
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
        zustand: "zustand",
        "zustand/middleware": "zustandMiddleware",
      },
    },
    plugins: [
      typescript({
        typescript: require("typescript"),
        tsconfigOverride: {
          compilerOptions: {
            declaration: false,
          },
        },
      }),
      babel({
        extensions: [".ts"],
        exclude: "node_modules/**",
        babelHelpers: "bundled",
      }),
    ],
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {}),
      "react/jsx-runtime",
      "zustand/middleware",
    ],
  },

  // Type Declarations
  {
    input: "src/index.ts",
    output: [{ file: pkg.types, format: "es" }],
    plugins: [dts()],
  },
]
