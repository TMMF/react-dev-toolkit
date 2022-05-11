import * as React from "react"
import { DevToolkitButton } from "react-dev-toolkit"
import Component from "./Component"

const Root = () => {
  return (
    <>
      <Component exampleString="Original Value 1" exampleNumber={45} />
      <DevToolkitButton />
    </>
  )
}

export default Root
