import * as React from "react"
import styled from "styled-components"

import { SquareIcon, SquareCheckIcon } from "./Icons"

const Styled = {
  Root: styled.div`
    color: #aaaaaa;
  `,
  Input: styled.input`
    cursor: pointer;

    appearance: none;
    width: 14px;
    height: 14px;

    display: none;
  `,
  FieldIcon: styled.div`
    width: 16px;
    height: 16px;
    margin-right: 4px;
    stroke-width: 2px;
  `,
}

type Props = {
  checked?: boolean
  onCheck?: (checked: boolean) => void
  className?: string
}

const Checkbox = (props: Props) => {
  const { checked, onCheck, className } = props
  const [innerChecked, setInnerChecked] = React.useState(false)

  const _checked = checked ?? innerChecked
  const _onCheck = onCheck ?? setInnerChecked

  const onChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => _onCheck(e.target.checked),
    [_onCheck],
  )

  return (
    <Styled.Root className={className}>
      <Styled.Input type="checkbox" checked={_checked} onChange={onChange} />
      {_checked ? (
        <Styled.FieldIcon as={SquareCheckIcon} />
      ) : (
        <Styled.FieldIcon as={SquareIcon} />
      )}
    </Styled.Root>
  )
}

export default Checkbox
