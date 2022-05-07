import * as React from "react"
import styled from "styled-components"

import Checkbox from "../Checkbox"

const Styled = {
  Checkbox: styled(Checkbox)<{ $hasError?: boolean }>`
    color: ${(props) => (props.$hasError ? "#ff6961" : null)};
  `,
  FieldTitle: styled.label<{ $hasError?: boolean }>`
    font-family: monospace;
    font-size: 12px;
    cursor: pointer;

    display: inline-flex;
    align-items: center;
    background-color: white;

    position: absolute;
    left: 10px;
    top: 0;
    padding: 0 4px;

    color: ${(props) => (props.$hasError ? "#ff6961" : "#6b6a6a")};

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    &:hover,
    &:hover svg {
      color: ${(props) => (!props.$hasError ? "#464646" : null)};
    }
  `,
}

type Props = {
  children: string
  checked?: boolean
  onCheck?: (checked: boolean) => void
  hasError?: boolean
  className?: string
}

const FieldTitle = (props: Props) => {
  const { children, checked, onCheck, hasError, className } = props

  return (
    <Styled.FieldTitle className={className} $hasError={hasError}>
      {checked != null && onCheck != null ? (
        <Styled.Checkbox
          checked={checked}
          onCheck={onCheck}
          $hasError={hasError}
        />
      ) : null}
      {children}
    </Styled.FieldTitle>
  )
}

export default FieldTitle
