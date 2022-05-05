import * as React from "react"
import {
  dev,
  FieldSize,
  StringControl,
  NumberControl,
  ObjectControl,
  ArrayControl,
  TupleControl,
  BooleanControl,
  SelectControl,
} from "@TMMF/react-dev-toolkit"

const useDevField0 = dev({
  title: "Test Title Value 3",
  control: NumberControl,
})

const useDevField1 = dev({
  title: "Test Title Value 1",
  control: StringControl,
  validation: undefined,
})

const useDevField2 = dev({
  title: "Test Title Value 2",
  control: StringControl,
  size: FieldSize.Large,
})

const useDevField3 = dev({
  title: "Test Object Value 4",
  control: ObjectControl({
    "Field 0": StringControl,
    "Field 1": NumberControl,
    "Field 2": NumberControl,
    "Field 3": StringControl,
  }),
})

const useDevField4 = dev({
  title: "Test Array Value 5",
  control: ArrayControl(StringControl),
})

const useDevField5 = dev({
  title: "Test Tuple Value 6",
  control: TupleControl([StringControl, NumberControl]),
})

const useDevField6 = dev({
  title: "Test Boolean Value 7",
  control: BooleanControl,
})

const useDevField7 = dev({
  title: "Test Boolean Value 7",
  control: SelectControl(["Val1", "Val2", "Val3"]),
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
      <p>Value 7: {value8.toString()}</p>
      <p>Value 8: {value9}</p>
    </>
  )
}

export default Component
