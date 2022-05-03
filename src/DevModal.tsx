import * as React from "react"
import styled from "styled-components"

import { useDebugFieldIds, useDebugField } from "./state"
import Modal from "./components/Modal"
import IconButton from "./components/IconButton"
import { SunIcon, CloseIcon } from "./components/Icons"

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
    display: flex;
    flex-direction: column;
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

  FieldControl: styled.div``,
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

  return (
    <Styled.Field>
      <Styled.FieldHeader>
        <Styled.FieldTitle>
          <Styled.FieldCheckbox
            type="checkbox"
            checked={field?.activated}
            onChange={onChangeCheckbox}
          />
          TODO: Title
        </Styled.FieldTitle>
      </Styled.FieldHeader>
      <Styled.FieldControl>
        {field && field.control ? <field.control /> : null}
      </Styled.FieldControl>
    </Styled.Field>
  )
}

const DevModal = (props: Props) => {
  const ids = useDebugFieldIds()

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
        {ids.map((id) => (
          <DevModalComponent id={id} />
        ))}
      </Styled.Fields>
    </Modal>
  )
}

export default DevModal
