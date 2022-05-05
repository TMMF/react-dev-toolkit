import * as React from "react"
import styled from "styled-components"

const Styled = {
  Fields: styled.div`
    grid-column: span 3;

    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: minmax(30px, auto);
    gap: 16px;
  `,
}

type Props = {
  children: React.ReactNode
  className?: string
}

const Fields = (props: Props) => {
  const { children, className } = props
  return <Styled.Fields className={className}>{children}</Styled.Fields>
}

export default Fields
