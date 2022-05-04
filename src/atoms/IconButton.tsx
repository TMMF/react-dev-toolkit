import * as React from "react"
import styled from "styled-components"

const Styled = {
  Button: styled.button`
    background-color: transparent;
    border: none;
    padding: 0;
    cursor: pointer;
    color: #999999;

    &:hover {
      color: black;
    }

    &:disabled {
      color: #b8b8b8;
    }
  `,
}

type Props = Omit<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >,
  "ref"
> & {
  Icon: JSX.Element
}

const IconButton = (props: Props): JSX.Element => {
  const { Icon, ...rest } = props
  return (
    <Styled.Button type="button" {...rest}>
      {Icon}
    </Styled.Button>
  )
}

export default IconButton
