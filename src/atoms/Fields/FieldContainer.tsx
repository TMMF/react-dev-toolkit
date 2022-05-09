import styled, { css } from "styled-components"
import { FieldSize } from "../../utils/constants"

import IconButton from "../IconButton"

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
  IconButton: styled(IconButton)`
    position: absolute;
    top: 12px;
    right: 6px;
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
  Icon?: JSX.Element
  onAction?: () => void
  children?: React.ReactNode
}

const FieldContainer = (props: Props) => {
  const { size, Icon, onAction, children } = props
  const Field = getFieldFromSize(size)
  return (
    <Field>
      {children}
      {Icon ? <Styled.IconButton Icon={Icon} onClick={onAction} /> : null}
    </Field>
  )
}

export default FieldContainer
