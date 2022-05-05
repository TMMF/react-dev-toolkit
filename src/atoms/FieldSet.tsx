import * as React from "react"
import styled from "styled-components"

const Styled = {
  Root: styled.div`
    border: 1px solid black;
    padding: 8px;
    max-height: 200px;
    overflow: scroll;
  `,
}

type Props = {
  children: React.ReactNode
}

const FieldSet = (props: Props) => {
  const { children } = props
  return <Styled.Root>{children}</Styled.Root>
}

export default FieldSet
