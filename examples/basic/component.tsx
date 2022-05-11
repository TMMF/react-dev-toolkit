import * as React from "react"
import {
  dev,
  FieldSize,
  StringControl,
  NumberControl,
  BooleanControl,
  SelectControl,
  ObjectControl,
  TupleControl,
  ArrayControl,
} from "@TMMF/react-dev-toolkit"

const useDevField0 = dev(NumberControl({ name: "Test Title Value 3" }))

const useDevField1 = dev(
  StringControl({
    name: "Test Title Value 1",
    // validation: undefined,
    defaultValue: "test",
  }),
)

const useDevField2 = dev(
  StringControl({
    name: "Test Title Value 2",
    size: FieldSize.Large,
  }),
)

const useDevField3 = dev(
  ObjectControl({
    name: "Test Object Value 4",
    fields: {
      "Field 0": StringControl({ name: "Field 0 (Custom Name)" }),
      "Field 1": NumberControl(),
      "Field 2": NumberControl(),
      "Field 3": StringControl(),
    },
  }),
)

const useDevField4 = dev(
  ArrayControl({ name: "Test Array Value 5", field: StringControl() }),
)

const useDevField5 = dev(
  TupleControl({
    name: "Test Tuple Value 6",
    fields: [
      StringControl({ name: "Index 0 (Custom Name)" }),
      NumberControl(),
    ] as const,
  }),
)

const useDevField6 = dev(BooleanControl({ name: "Test Boolean Value 7" }))

const useDevField7 = dev(
  SelectControl({
    name: "Test Boolean Value 7",
    options: ["Val1", "Val2", "Val3"],
  }),
)

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
  const value6 = useDevField4(["TEST"])
  const value7 = useDevField5(["TEST", 123])
  const value8 = useDevField6(false)
  const value9 = useDevField7("Val1")

  return (
    <>
      <p>Value 1a: {value1}</p>
      <p>Value 1b: {value2}</p>
      <p>Value 2: {value3}</p>
      <p>Value 3: {value4}</p>
      <p>Value 4: {JSON.stringify(value5)}</p>
      <p>Value 5: {JSON.stringify(value6)}</p>
      <p>Value 6: {JSON.stringify(value7)}</p>
      <p>Value 7: {value8?.toString()}</p>
      <p>Value 8: {value9}</p>
    </>
  )
}

export default Component
