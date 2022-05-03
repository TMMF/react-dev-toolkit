import * as React from "react"
import * as ReactDOM from "react-dom/client"

import Component from "./component"

const rootElement = document.querySelector("#root")
if (rootElement == null) {
  throw new Error("Failed to query root element")
}

const root = ReactDOM.createRoot(rootElement)
root.render(<Component />)