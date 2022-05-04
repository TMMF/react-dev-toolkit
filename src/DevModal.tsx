import * as React from "react"
import styled from "styled-components"

import { useDebugFieldIds, useDebugField } from "./state"
import Modal from "./components/Modal"
import IconButton from "./components/IconButton"
import { SunIcon, CloseIcon, HelpIcon } from "./components/Icons"

const Styled = {
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

  Fields: styled.div`
    display: grid;
    grid-template-columns: repeat(2, 150px);
    grid-auto-rows: minmax(30px, auto);
    gap: 16px;
  `,
  Field: styled.div``,
  FieldHeader: styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 4px;
  `,
  FieldCheckbox: styled.input`
    margin: 0;
    margin-right: 4px;
    cursor: pointer;
  `,
  FieldTitle: styled.label`
    font-family: monospace;
    font-size: 14px;
    cursor: pointer;
  `,
  FieldHelp: styled(HelpIcon)`
    width: 16px;
    height: 16px;
    stroke-width: 3px;
    color: #b8b8b8;
    margin-left: 4px;
  `,
  FieldControl: styled.div``,

  // ---
  GroupedField: styled.div`
    border: 1px solid red;
    grid-column: 1 / 3;

    /* TODO: Combine with Fields css above */
    display: grid;
    grid-template-columns: repeat(2, 150px);
    grid-auto-rows: minmax(30px, auto);
    gap: 16px;
  `,
  NarrowField: styled.div`
    border: 1px solid blue;
  `,
  WideField: styled.div`
    border: 1px solid blue;
    grid-column: 1 / 3;
  `,
}

type Props = {}

const DevModalComponent = (props: { id: string }) => {
  const { id } = props
  const [field, updateField] = useDebugField(id)

  const onChangeCheckbox = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      updateField({ activated: e.target.checked }),
    [updateField],
  )

  // TODO
  let description = "a"

  let wide = true
  const Field = wide ? Styled.WideField : Styled.NarrowField

  return (
    <Field>
      <Styled.FieldHeader>
        <Styled.FieldTitle>
          <Styled.FieldCheckbox
            type="checkbox"
            checked={field?.activated}
            onChange={onChangeCheckbox}
          />
          TODO: Title
        </Styled.FieldTitle>
        {description ? <Styled.FieldHelp /> : null}
      </Styled.FieldHeader>
      <Styled.FieldControl>
        {field && field.control ? <field.control /> : null}
      </Styled.FieldControl>
    </Field>
  )
}

const DevModal = (props: Props) => {
  const ids = useDebugFieldIds()

  // TODO: reorder fields based on alphabetical titles?
  // TODO: reorder fields to match narrow fields together?

  return (
    <Modal>
      <Styled.TitleBar>
        <Styled.Title>Development Toolkit</Styled.Title>
        <Styled.Controls>
          <IconButton Icon={<SunIcon />} aria-label="Light Mode" />
          <IconButton Icon={<CloseIcon />} aria-label="Close Modal" />
        </Styled.Controls>
      </Styled.TitleBar>

      <Styled.Fields>
        <Styled.WideField />
        <Styled.WideField />
        <Styled.NarrowField />
        <Styled.NarrowField />
        <Styled.WideField />
        <Styled.GroupedField>
          <Styled.WideField />
          <Styled.NarrowField />
          <Styled.NarrowField />
        </Styled.GroupedField>

        {ids.map((id) => (
          <DevModalComponent key={id} id={id} />
        ))}
      </Styled.Fields>
    </Modal>
  )
}

export default DevModal
