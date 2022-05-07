import styled, { css } from "styled-components"
import { FieldSize } from "../../utils/constants"

const fieldCss = css`
  position: relative;
  padding-top: 7px;
`

const Styled = {
  SmallField: styled.div`
    ${fieldCss};
    grid-column: span 1;
  `,
  MediumField: styled.div`
    ${fieldCss};
    grid-column: span 2;
  `,
  LargeField: styled.div`
    ${fieldCss};
    grid-column: span 3;
  `,
}

const getFieldFromSize = (size: FieldSize) => {
  switch (size) {
    case FieldSize.Small:
      return Styled.SmallField
    case FieldSize.Medium:
      return Styled.MediumField
    case FieldSize.Large:
      return Styled.LargeField
  }
}

type Props = {
  size: FieldSize
  children?: React.ReactNode
}

const FieldContainer = (props: Props) => {
  const { size, children } = props
  const Field = getFieldFromSize(size)
  return <Field>{children}</Field>
}

export default FieldContainer
