// export { default as DevToolkitModal } from "./components/DevToolkitModal"
export { default as DevToolkitButton } from "./components/DevToolkitButton"
export * from "./utils/constants"
export * from "./utils/controls"

export { default as StringField } from "./atoms/Fields/StringField"
export { default as NumberField } from "./atoms/Fields/NumberField"
export { default as BooleanField } from "./atoms/Fields/BooleanField"
export { default as SelectField } from "./atoms/Fields/SelectField"
export { default as ObjectField } from "./atoms/Fields/ObjectField"
export { default as TupleField } from "./atoms/Fields/TupleField"
export { default as ArrayField } from "./atoms/Fields/ArrayField"

// TODO: Define a utility function for transforming the data from

// TODO: define a getter function alongside the hook

// TODO: accessibility - need to focus lock within the modal
// TODO: organize standard controls within a separate folder for import (import {...} from "react-dev-toolkit/controls")

// TODO: fix hot-reloading issues where new components pop up

// TODO: create color palettes for light mode + dark mode, allow passing in custom color pallette, allow setting color mode via prop or via ENV variable

// TODO: allow fields to show/hide depending on components? build in watcher functionality to show hide fields dynamically?
// TODO: build out tabbing? allow better organization of fields?

// TODO: add error messages for data validation

// TODO: change how sizing defaults work; reference equality doesn't work with ObjectControl due to defining new ones always

// TODO: add import / export functionality to save and share mocked data
// TODO: add functionality to select from pre-existing mocks within a specified folder

// TODO: maybe not for MVP
/*
// Each of these is a type on `input` element
export const DateControl = undefined
export const TimeControl = undefined
export const DateTimeControl = undefined
export const ColorControl = undefined
export const EmailControl = undefined
export const TelephoneControl = undefined
export const UrlControl = undefined

export const UnionControl = undefined
*/
