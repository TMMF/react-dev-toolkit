import * as React from "react"
import styled from "styled-components"

import Field from "../atoms/Field"
import Fields from "../atoms/Fields"
import Modal from "../atoms/Modal"
import IconButton from "../atoms/IconButton"
import { SunIcon, CloseIcon, MoonIcon } from "../atoms/Icons"
import { ColorMode } from "../utils/constants"
import { useIds, useField } from "../utils/state"

import StringField from "../atoms/Fields/StringField"
import NumberField from "../atoms/Fields/NumberField"
import BooleanField from "../atoms/Fields/BooleanField"

export const Styled = {
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
  const [field, updateField] = useField(id)

  const onChangeCheckbox = React.useCallback(
    (checked: boolean) => updateField({ activated: checked }),
    [updateField],
  )

  return (
    <Field
      title={field.title}
      size={field.size}
      checked={field.activated}
      onClickCheckbox={onChangeCheckbox}
      control={<field.control />}
    />
  )
}

type Props = {
  onClose: () => void
  colorMode: ColorMode
  toggleColorMode: () => void
}

const DevModal = (props: Props) => {
  const { onClose, colorMode, toggleColorMode } = props
  const ids = useIds()

  // TODO: reorder fields based on alphabetical titles?
  // TODO: reorder fields to match narrow fields together?

  const ColorModeIcon = colorMode === ColorMode.Light ? SunIcon : MoonIcon

  // TODO: REMOVE
  const [str, setStr] = React.useState("test")
  const [num, setNum] = React.useState(123)
  const [bool, setBool] = React.useState(false)
  const [checked, setCheckd] = React.useState(false)

  return (
    <Modal>
      <Styled.TitleBar>
        <Styled.Title>Development Toolkit</Styled.Title>
        <Styled.Controls>
          <IconButton Icon={<ColorModeIcon />} onClick={toggleColorMode} />
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

        <hr />
        <hr />
        <hr />

        <StringField
          name="String Field"
          value={str}
          onChange={setStr}
          checked={checked}
          onCheck={setCheckd}
        />
        <NumberField
          name="Number Field"
          value={num}
          onChange={setNum}
          checked={checked}
          onCheck={setCheckd}
        />
        <BooleanField
          name="Boolean Field"
          value={bool}
          onChange={setBool}
          checked={checked}
          onCheck={setCheckd}
        />
      </Fields>
    </Modal>
  )
}

export default DevModal
