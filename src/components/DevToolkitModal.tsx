import * as React from "react"
import styled from "styled-components"

import Field from "../atoms/Field"
import Fields from "../atoms/Fields/Fields"
import Modal from "../atoms/Modal"
import IconButton from "../atoms/IconButton"
import { SunIcon, CloseIcon, MoonIcon } from "../atoms/Icons"
import { ColorMode } from "../utils/constants"
import { useIds, useField } from "../utils/state"

import StringField from "../atoms/Fields/StringField"
import NumberField from "../atoms/Fields/NumberField"
import BooleanField from "../atoms/Fields/BooleanField"
import SelectField from "../atoms/Fields/SelectField"
import ObjectField from "../atoms/Fields/ObjectField"
import TupleField from "../atoms/Fields/TupleField"
import ArrayField from "../atoms/Fields/ArrayField"

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
  const [select, setSelect] = React.useState("Test 1")
  const [obj, setObj] = React.useState({})
  const [tuple, setTuple] = React.useState([])
  const [arr, setArr] = React.useState([])
  const [checked, setChecked] = React.useState(false)

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
          onCheck={setChecked}
        />
        <NumberField
          name="Number Field"
          value={num}
          onChange={setNum}
          checked={checked}
          onCheck={setChecked}
        />
        <BooleanField
          name="Boolean Field"
          value={bool}
          onChange={setBool}
          checked={checked}
          onCheck={setChecked}
        />
        <SelectField
          name="Select Field"
          value={select}
          onChange={setSelect}
          checked={checked}
          onCheck={setChecked}
        />
        <ObjectField
          name="Object Field"
          // TODO: doesn't handle nesting of ObjectField within ObjectField well
          fields={{
            "Field 1": StringField,
            "Field 2": NumberField,
            "Field 3": NumberField,
            "Field 4": StringField,
          }}
          value={obj}
          onChange={setObj}
          checked={checked}
          onCheck={setChecked}
        />
        <TupleField
          name="Tuple Field"
          // TODO: doesn't handle nesting of ObjectField within ObjectField well
          fields={[StringField, NumberField, NumberField, StringField]}
          value={tuple}
          onChange={setTuple}
          checked={checked}
          onCheck={setChecked}
        />
        <ArrayField
          name="Array Field"
          // TODO: doesn't handle nesting of ObjectField within ObjectField well
          Field={StringField}
          value={arr}
          onChange={setArr}
          checked={checked}
          onCheck={setChecked}
        />
      </Fields>
    </Modal>
  )
}

export default DevModal
