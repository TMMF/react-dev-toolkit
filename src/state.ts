import * as React from "react"
import create from "zustand"
import { Control } from "./controls"

type ControlState<Value extends unknown> = Control & {
  activated: boolean
  value: Value
}

type DebugState = {
  [key in string]: ControlState<unknown>
}

export const useStore = create<DebugState>(() => ({}))

export const useDebugFieldIds = () => {
  const ids = useStore((state) => Object.keys(state))
  return ids
}

export const useDebugField = <Value extends unknown>(id: string) => {
  const field = useStore((state) => state[id])

  const updateField = (data: Partial<ControlState<Value>>) => {
    useStore.setState((state) => ({
      ...state,
      [id]: { ...state[id], ...data },
    }))
  }

  return React.useMemo(
    () => [field, updateField] as const,
    [field, updateField],
  )
}
