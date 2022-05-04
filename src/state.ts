import * as React from "react"
import { atom, useAtom, useAtomValue } from "jotai"
import { Control } from "./controls"

type ControlState<Value extends unknown> = {
  activated: boolean
  value: Value
  control: Control | null
}

type DebugState = {
  [key in string]?: ControlState<unknown>
}

const debugAtom = atom<DebugState>({})

export const useDebugFieldIds = () => {
  const debugState = useAtomValue(debugAtom)
  return React.useMemo(() => Object.keys(debugState), [debugState])
}

export const useDebugField = <Value extends unknown>(id: string) => {
  const [debugState, setDebugState] = useAtom(debugAtom)

  const field = debugState[id] as ControlState<Value>
  const updateField = React.useCallback(
    (data: Partial<ControlState<Value>>) => {
      setDebugState((ds) => ({
        ...ds,
        [id]: {
          activated: false,
          value: undefined as Value,
          control: null,
          ...ds[id],
          ...data,
        },
      }))
    },
    [],
  )

  return React.useMemo(
    () => [field, updateField] as const,
    [field, updateField],
  )
}
