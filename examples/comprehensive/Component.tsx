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
} from "react-dev-toolkit"

const useDevField0 = dev(NumberControl({ name: "Number Value [0]" }))

const useDevField1 = dev(
  StringControl({
    name: "String Value [1]",
    // validation: undefined,
    defaultValue: "test",
  }),
)

const useDevField2 = dev(
  StringControl({
    name: "String Value [2]",
    size: FieldSize.Large,
  }),
)

const useDevField3 = dev(
  ObjectControl({
    name: "Object Value [3]",
    fields: {
      "Field 0": StringControl({ name: "Field 0 (Custom Name)" }),
      "Field 1": NumberControl(),
      "Field 2": NumberControl(),
      "Field 3": StringControl(),
    },
  }),
)

const useDevField4 = dev(
  ArrayControl({ name: "Array Value [4]", field: StringControl() }),
)

const useDevField5 = dev(
  TupleControl({
    name: "Tuple Value [5]",
    fields: [
      StringControl({ name: "Index 0 (Custom Name)" }),
      NumberControl(),
    ] as const,
  }),
)

const useDevField6 = dev(BooleanControl({ name: "Boolean Value [6]" }))

const useDevField7 = dev(
  SelectControl({
    name: "Select Value [7]",
    options: ["Val1", "Val2", "Val3"],
  }),
)
useDevField7.subscribe(console.log)
useDevField7.subscribeMocked(console.log)

const Component = () => {
  const value0 = useDevField0(123)
  const value1a = useDevField1("Original Value 1")
  const value1b = useDevField1("Original Value 2")
  const value2 = useDevField2("Original Value 3")
  const value3 = useDevField3({
    "Field 0": "test 1",
    "Field 1": 123,
    "Field 2": 456,
    "Field 3": "test 2",
  })
  const value4 = useDevField4(["TEST"])
  const value5 = useDevField5(["TEST", 123])
  const value6 = useDevField6(false)
  const value7 = useDevField7("Val1")

  const onClickGET = () => {
    console.log(
      useDevField7.getValue(),
      useDevField7.getValue("Val1"),
      useDevField7.isMocked(),
    )
  }

  const onClickSET = () => {
    useDevField7.setValue("Val2")
    useDevField7.setMocked(true)
  }

  return (
    <>
      <p>Value 0: {value0}</p>
      <p>Value 1a: {value1a}</p>
      <p>Value 1b: {value1b}</p>
      <p>Value 2: {value2}</p>
      <p>Value 3: {JSON.stringify(value3)}</p>
      <p>Value 4: {JSON.stringify(value4)}</p>
      <p>Value 5: {JSON.stringify(value5)}</p>
      <p>Value 6: {value6?.toString()}</p>
      <p>Value 7: {value7}</p>
      <button onClick={onClickGET}>GET VALUE8 IN CONSOLE</button>
      <button onClick={onClickSET}>SET VALUE8 IN CONSOLE</button>
    </>
  )
}

export default Component
