import * as React from "react"
import styled from "styled-components"

import { FieldSize } from "../../utils/constants"
import { FieldProps, FieldElement } from "../../utils/types"
import { ChevronDownIcon } from "../Icons"

import { ContainerStyle } from "./shared"
import Field from "./Field"

const Styled = {
  Select: styled.select`
    appearance: none;
    background-color: white;

    &:not(:disabled):hover {
      cursor: pointer;
    }

    ${ContainerStyle};
  `,
  ChevronDownIcon: styled(ChevronDownIcon)`
    position: absolute;
    top: 13px;
    right: 6px;
    color: #aaaaaa;
  `,
  Option: styled.option``,
}

interface SelectFieldProps<Value extends string> extends FieldProps<Value> {
  options: Value[]
}

export const SelectField = <Value extends string>(
  props: SelectFieldProps<Value>,
): FieldElement<Value> => {
  const {
    name,
    options,
    size,
    value,
    onChange,
    checked,
    onCheck,
    error,
    ActionIcon,
    onAction,
  } = props

  const _onChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) =>
      onChange?.(e.target.value as Value),
    [onChange],
  )

  const hasError = !!error
  return (
    <Field
      name={name}
      size={size ?? FieldSize.Small}
      checked={checked}
      onCheck={onCheck}
      ActionIcon={ActionIcon}
      onAction={onAction}
      error={error}
    >
      <Styled.Select value={value} onChange={_onChange} $hasError={hasError}>
        {options.map((val) => (
          <Styled.Option key={val} value={val}>
            {val}
          </Styled.Option>
        ))}
      </Styled.Select>
      <Styled.ChevronDownIcon />
    </Field>
  )
}

export default SelectField
