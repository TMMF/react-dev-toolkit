import * as React from "react"
import DevToolkitModal from "./DevToolkitModal"

// TODO: need props to indicate where the button should render
const DevToolkitProvider = (props: { children: React.ReactNode }) => {
  const { children } = props

  // TODO: need to add button here to open the modal
  return (
    <>
      {children}
      <DevToolkitModal />
    </>
  )
}

export default DevToolkitProvider
