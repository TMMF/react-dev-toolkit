import * as React from "react"
import {
  dev,
  FieldSize,
  StringControl,
  NumberControl,
  ObjectControl,
} from "@TMMF/react-dev-toolkit"

const useDevField0 = dev({
  title: "Test Title Value 3",
  control: NumberControl,
})

const useDevField1 = dev({
  title: "Test Title Value 1",
  description: "This is a test description to explain this component",
  control: StringControl,
  validation: undefined,
})

const useDevField2 = dev({
  title: "Test Title Value 2",
  control: StringControl,
  size: FieldSize.Large,
})

const useDevField3 = dev({
  title: "Test Group Value",
  control: ObjectControl({
    "Field 0": StringControl,
    "Field 1": NumberControl,
    "Field 2": NumberControl,
    "Field 3": StringControl,
  }),
})

const Component = () => {
  const value1 = useDevField1("Original Value 1")
  const value2 = useDevField1("Original Value 2")
  const value3 = useDevField2("Original Value 3")
  const value4 = useDevField0(123)
  const value5 = useDevField3({
    "Field 0": "test 1",
    "Field 1": 123,
    "Field 2": 456,
    "Field 3": "test 2",
  })

  return (
    <>
      <p>Value 1a: {value1}</p>
      <p>Value 1b: {value2}</p>
      <p>Value 2: {value3}</p>
      <p>Value 3: {value4}</p>
      <p>Value 4: {JSON.stringify(value5)}</p>
    </>
  )
}

export default Component
