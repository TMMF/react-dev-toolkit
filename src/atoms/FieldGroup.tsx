import * as React from "react"
import styled from "styled-components"

import Fields from "./Fields"

const Styled = {
  Root: styled(Fields)`
    border: 1px solid black;
    padding: 8px;
  `,
}

type Props = {
  children: React.ReactNode
}

const FieldGroup = (props: Props) => {
  const { children } = props
  return <Styled.Root>{children}</Styled.Root>
}

export default FieldGroup
