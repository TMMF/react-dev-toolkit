import * as React from "react"
import { DevToolkitProvider } from "@TMMF/react-dev-toolkit"
import Component from "./Component"

const Root = () => {
  return (
    <DevToolkitProvider>
      <Component />
    </DevToolkitProvider>
  )
}

export default Root
