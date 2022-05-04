import * as React from "react"
import {
  useDevValue,
  DevModal,
  control,
  StringControl,
} from "@TMMF/react-dev-toolkit"

const testControl1 = control({
  title: "Test Title Value 1",
  description: "This is a test description to explain this component",
  control: StringControl,
  validation: undefined,
})

const testControl2 = control({
  title: "Test Title Value 2",
  control: StringControl,
  validation: undefined,
})

const Component = () => {
  const value1 = useDevValue(() => "Original Value 1", testControl1)
  const value2 = useDevValue(() => "Original Value 2", testControl1)
  const value3 = useDevValue(() => "Original Value 3", testControl2)

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
