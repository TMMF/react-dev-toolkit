import * as React from "react"
import styled from "styled-components"

const Styled = {
  FieldError: styled.p`
    margin: 0;
    font-family: monospace;
    font-size: 12px;
    color: #ff6961;

    display: flex;
    align-items: center;
  `,
}

type Props = {
  children?: string
  className?: string
}

const FieldError = (props: Props) => {
  const { children, className } = props
  if (children == null) {
    return null
  }

  return <Styled.FieldError className={className}>{children}</Styled.FieldError>
}

export default FieldError
