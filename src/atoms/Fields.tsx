import * as React from "react"
import styled, { css } from "styled-components"

const borderCss = css`
  border: 1px solid black;
  padding: 8px;
`

const Styled = {
  Fields: styled.div<{ $showBorder?: boolean }>`
    grid-column: span 3;
    ${(props) => (props.$showBorder ? borderCss : null)};

    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: minmax(30px, auto);
    gap: 16px;
  `,
}

type Props = {
  children: React.ReactNode
  showBorder?: boolean
}

const Fields = (props: Props) => {
  const { children, showBorder } = props
  return <Styled.Fields $showBorder={showBorder}>{children}</Styled.Fields>
}

export default Fields
