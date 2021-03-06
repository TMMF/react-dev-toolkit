import * as React from "react"
import styled from "styled-components"

import Fields from "../atoms/Fields"
import Modal from "../atoms/Modal"
import IconButton from "../atoms/IconButton"
import { SunIcon, CloseIcon, MoonIcon } from "../atoms/Icons"
import { ColorMode } from "../utils/constants"
import { useIds, useField } from "../utils/state"

export const Styled = {
  Modal: styled(Modal)`
    width: 50%;
    max-width: 750px;
    min-width: 500px;
  `,
  TitleBar: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: -24px -24px 16px -24px;
    padding: 8px;

    border-bottom: 2px solid #ededed;
  `,
  Title: styled.p`
    margin: 0;
    color: #707070;
    font-family: monospace;
    font-size: 14px;
    margin-right: 24px;
  `,
  Controls: styled.div`
    display: flex;
    gap: 8px;
  `,
}

const DevModalField = (props: { id: string }) => {
  const { id } = props
  const [field] = useField(id)
  return <field.control />
}

type Props = {
  onClose: () => void
  colorMode: ColorMode
  toggleColorMode: () => void
}

const DevModal = (props: Props) => {
  const { onClose, colorMode, toggleColorMode } = props
  const ids = useIds()

  const ColorModeIcon = colorMode === ColorMode.Light ? SunIcon : MoonIcon

  return (
    <Styled.Modal>
      <Styled.TitleBar>
        <Styled.Title>Development Toolkit</Styled.Title>
        <Styled.Controls>
          {/* <IconButton Icon={<ColorModeIcon />} onClick={toggleColorMode} /> */}
          <IconButton
            Icon={<CloseIcon />}
            onClick={onClose}
            aria-label="Close Modal"
          />
        </Styled.Controls>
      </Styled.TitleBar>

      <Fields>
        {ids.map((id) => (
          <DevModalField key={id} id={id} />
        ))}
      </Fields>
    </Styled.Modal>
  )
}

export default DevModal
