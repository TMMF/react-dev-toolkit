import * as React from "react"
import { dev, StringControl, NumberControl } from "@TMMF/react-dev-toolkit"

const useDevField1 = dev({
  title: "Test Title Value 1",
  description: "This is a test description to explain this component",
  control: StringControl,
  validation: undefined,
})

const useDevField2 = dev({
  title: "Test Title Value 2",
  control: StringControl,
})

const useDevField3 = dev({
  title: "Test Title Value 3",
  control: NumberControl,
})

const Component = () => {
  const value1 = useDevField1("Original Value 1")
  const value2 = useDevField1("Original Value 2")
  const value3 = useDevField2("Original Value 3")
  const value4 = useDevField3(123)

  return (
    <>
      <p>Value 1a: {value1}</p>
      <p>Value 1b: {value2}</p>
      <p>Value 2: {value3}</p>
      <p>Value 3: {value4}</p>
    </>
  )
}

export default Component
