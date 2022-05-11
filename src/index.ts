// export { default as DevToolkitModal } from "./components/DevToolkitModal"
export { default as DevToolkitButton } from "./components/DevToolkitButton"
export * from "./utils/constants"
export * from "./utils/controls"

/**
 * Non-Proof of Concept Todos / Ideas:
 * - Accessibility: Focus locking with Modals
 * - Accessibility: Focusable Checkboxes
 * - Accessibility: Aria Labels
 * - Feature: Auto-Organize fields within Modal (Either alphabetically or for space-efficiency)
 * - Feature: Build out tabs to allow high-level control grouping
 * - Feature: Build out field validation (using yup?), pass errors to individual fields
 * - Feature: Build out color palettes + light/dark modes; allow custom color palettes / color mode via props / env variable
 * - Feature: Build out transformer function for data output
 * - Feature: Build out merge property to allow partial data mocking on things like objects
 * - Feature: Import / Export functionality to share mock data
 * - Feature: Selector to use data from folder of predefined mocks
 * - Feature: Tooling to easily create custom controls (either setting params like in UrlControl, or fully new controls); provide util components for field definition
 * - Feature: More advance Controls/Fields:
 *   - UnionControl: Union of multiple controls, allow selecting any one of them (this will help power up the ArrayControl)
 *   - DateControl: Choose a date, date-range, etc in an ISO-format (use transform to change format)
 *   - TimeControl: Choose a time, time-range, etc in an ISO-format (use transform to change format)
 *   - DateTimeControl: Choose a datetime, datetime-range, etc in an ISO-format (use transform to change format)
 *   - ColorControl: Choose a color
 *   - EmailControl: A StringControl with builtin email data validation
 *   - TelephoneControl: A StringControl with builtin phone data validation
 *   - UrlControl: A StringControl with builtin url data validation
 *   - More Pre-bui
 * - Bug: Fix hot module replacement (HMR) issues
 * - Bug: Fix deleting complex fields from ArrayControl (ObjectField, ArrayField, TupleField)
 * - Bug: New array elements show use the default value when available
 * - Improvement: Change ID generation logic for `dev(...)`
 * - Improvement: Separate `FieldProps` into essential params and non-essential params
 * - Improvement: Create JS-Docs for the public functions
 * - Improvement: Improve documentation and code examples
 */
