export { default as Modal } from "./components/Modal"
import { useDebugField } from "./state"
import { Control } from "./controls"

type Func<Params extends unknown[], Res> = (...params: Params) => Res

export const useDevValue = <Params extends unknown[], Res>(
  fn: Func<Params, Res>,
  control: Control,
) => {
  const [field] = useDebugField(control.$$id)

  if (field?.activated) {
    return () => field.value
  } else {
    return fn
  }
}
