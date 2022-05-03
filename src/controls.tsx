import * as React from "react"
import { useDebugField } from "./state"

const newControl = () => {
  const id = "Test-Field"

  const TestControl = () => {
    const [field, updateField] = useDebugField<string>(id)
    const onChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) =>
        updateField({ value: e.target.value }),
      [updateField],
    )

    return <input type="text" value={field?.value} onChange={onChange} />
  }
  TestControl.$$id = id

  return TestControl
}
