import * as React from "react"
import { dev, NumberControl, StringControl } from "react-dev-toolkit"

const useDevExampleString = dev(StringControl({ name: "Example String" }))
const useDevExampleNumber = dev(NumberControl({ name: "Example Number" }))

const Component = (props: { exampleString: string; exampleNumber: number }) => {
  const exampleString = useDevExampleString(props.exampleString)
  const exampleNumber = useDevExampleNumber(props.exampleNumber)

  return (
    <>
      <p>Example String: {exampleString}</p>
      <p>Example Number: {exampleNumber}</p>
    </>
  )
}

export default Component
