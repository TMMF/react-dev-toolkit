import * as React from "react"
import styled from "styled-components"

import { useDebugFieldIds, useDebugField } from "./state"
import Modal from "./components/Modal"
import IconButton from "./components/IconButton"
import { CloseIcon } from "./components/Icons"

const Styled = {
  Root: styled.div`
    display: flex;
    flex-direction: column;
  `,
  Controls: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: -32px -32px 16px -32px;
    padding: 8px;

    border-bottom: 2px solid #ededed;
  `,
  ModalTitle: styled.p`
    margin: 0;
    color: #707070;
    font-family: monospace;
    font-size: 14px;
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

  return (
    <>
      <div>
        <input
          type="checkbox"
          name="test"
          checked={field?.activated}
          onChange={onChangeCheckbox}
        />
        <label htmlFor="test">TODO: Title</label>
      </div>
      {field && field.control ? <field.control /> : null}
    </>
  )
}

const DevModal = (props: Props) => {
  const ids = useDebugFieldIds()

  return (
    <Modal>
      <Styled.Controls>
        <Styled.ModalTitle>Development Toolkit</Styled.ModalTitle>
        <IconButton Icon={<CloseIcon />} aria-label="Close Modal" />
      </Styled.Controls>

      <Styled.Root>
        {ids.map((id) => (
          <DevModalComponent id={id} />
        ))}
      </Styled.Root>
    </Modal>
  )
}

export default DevModal
