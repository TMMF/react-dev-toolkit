import * as React from "react"
import styled from "styled-components"

import Field from "../atoms/Field"
import Fields from "../atoms/Fields"
import Modal from "../atoms/Modal"
import IconButton from "../atoms/IconButton"
import { SunIcon, CloseIcon } from "../atoms/Icons"
import { useIds, useField } from "../utils/state"

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
      description={field.description}
      size={field.size}
      checked={field.activated}
      onClickCheckbox={onChangeCheckbox}
      control={<field.control />}
    />
  )
}

type Props = {
  onClose: () => void
}

const DevModal = (props: Props) => {
  const { onClose } = props
  const ids = useIds()

  // TODO: reorder fields based on alphabetical titles?
  // TODO: reorder fields to match narrow fields together?

  return (
    <Modal>
      <Styled.TitleBar>
        <Styled.Title>Development Toolkit</Styled.Title>
        <Styled.Controls>
          <IconButton Icon={<SunIcon />} aria-label="Light Mode" />
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
    </Modal>
  )
}

export default DevModal
