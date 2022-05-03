import * as React from "react"
import { useDevValue, DevModal } from "@TMMF/react-dev-toolkit"

import { useDebugField } from "../../src/state"

const TestControl = () => {
  const [field, updateField] = useDebugField("Test-Field")
  return (
    <input
      type="text"
      onChange={(e) => {
        updateField({ value: e.target.value })
      }}
    />
  )
}
TestControl.$$id = "Test-Field"

const TestControl2 = () => {
  const [field, updateField] = useDebugField("Test-Field2")
  return (
    <input
      type="text"
      onChange={(e) => {
        updateField({ value: e.target.value })
      }}
    />
  )
}
TestControl2.$$id = "Test-Field2"

const Component = () => {
  const value1 = useDevValue(() => "Original Value 1", TestControl)
  const value2 = useDevValue(() => "Original Value 2", TestControl)
  const value3 = useDevValue(() => "Original Value 3", TestControl2)
  console.log(Component.name)

  return (
    <>
      <p>Value 1a: {value1()}</p>
      <p>Value 1b: {value2()}</p>
      <p>Value 2: {value3()}</p>
      <DevModal />
    </>
  )
}

export default Component
