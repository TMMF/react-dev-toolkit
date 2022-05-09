import * as React from "react"

import { FieldSize } from "../../utils/constants"

import FieldContainer from "./FieldContainer"
import FieldTitle from "./FieldTitle"
import FieldError from "./FieldError"

export type Props = {
  name: string
  size: FieldSize
  error?: string
  children: React.ReactNode

  checked?: boolean
  onCheck?: (checked: boolean) => void
  ActionIcon?: JSX.Element
  onAction?: () => void

  className?: string
}

export const Field = (props: Props) => {
  const {
    name,
    size,
    children,
    checked,
    onCheck,
    error,
    ActionIcon,
    onAction,
    className,
  } = props

  const hasError = !!error
  return (
    <FieldContainer
      size={size}
      ActionIcon={ActionIcon}
      onAction={onAction}
      className={className}
    >
      <FieldTitle checked={checked} onCheck={onCheck} hasError={hasError}>
        {name}
      </FieldTitle>
      {children}
      <FieldError>{error}</FieldError>
    </FieldContainer>
  )
}

export default Field
