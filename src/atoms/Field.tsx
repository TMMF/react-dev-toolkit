import * as React from "react"
import styled from "styled-components"

import { HelpIcon } from "../atoms/Icons"
import { FieldSize } from "../utils/constants"

const Styled = {
  FieldHeader: styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 4px;
  `,
  FieldCheckbox: styled.input`
    margin: 0;
    margin-right: 4px;
    cursor: pointer;
  `,
  FieldTitle: styled.label`
    font-family: monospace;
    font-size: 14px;
    cursor: pointer;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `,
  FieldHelp: styled(HelpIcon)`
    width: 16px;
    height: 16px;
    stroke-width: 3px;
    color: #b8b8b8;
    margin-left: 4px;
  `,
  FieldControl: styled.div``,
  SmallField: styled.div`
    grid-column: span 1;
  `,
  MediumField: styled.div`
    grid-column: span 2;
  `,
  LargeField: styled.div`
    grid-column: span 3;
  `,
}

type Props = {
  title: string
  description?: string
  size: FieldSize
  checked?: boolean
  onClickCheckbox?: (checked: boolean) => void
  Control: React.ComponentType
}

export const Field = (props: Props) => {
  const { title, description, size, checked, onClickCheckbox, Control } = props

  const _onClickCheckbox = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      onClickCheckbox?.(e.target.checked),
    [onClickCheckbox],
  )

  const Field =
    size === FieldSize.Large
      ? Styled.LargeField
      : size === FieldSize.Medium
      ? Styled.MediumField
      : Styled.SmallField

  return (
    <Field>
      <Styled.FieldHeader>
        <Styled.FieldTitle>
          {checked != null && onClickCheckbox != null ? (
            <Styled.FieldCheckbox
              type="checkbox"
              checked={checked}
              onChange={_onClickCheckbox}
            />
          ) : null}
          {title}
        </Styled.FieldTitle>
        {description ? <Styled.FieldHelp /> : null}
      </Styled.FieldHeader>
      <Styled.FieldControl>
        <Control />
      </Styled.FieldControl>
    </Field>
  )
}

export default Field
