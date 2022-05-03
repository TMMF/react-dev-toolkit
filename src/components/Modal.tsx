import * as React from "react"
import * as ReactDOM from "react-dom"
import styled, { css } from "styled-components"

// -- Styling Helpers --

const range = (start: number, end: number) => {
  const res = new Array(end - start)
  for (let i = 0; i < res.length; i++) {
    res[i] = start + i
  }
  return res
}

const buildBoxShadow = (color: string) =>
  range(0, 5)
    .map((i) => Math.pow(2, i))
    .map((offset) => `0 ${offset}px ${offset}px ${color}`)
    .join(", ")

// TODO: define 'elevations' instead of using a direct color

const elevatedContainer = (color: string) => css`
  box-shadow: ${buildBoxShadow(color)};
  border: 1px solid ${color};
`

// -- Styling Helpers --

const Styled = {
  Backdrop: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  `,
  Modal: styled.div`
    background-color: white;
    padding: 24px;
    border-radius: 4px;
    ${elevatedContainer("rgba(0, 0, 0, 0.05)")};
  `,
}

type Props = { children: React.ReactNode }

const portalElement = document.createElement("div")
document.body.insertAdjacentElement("beforeend", portalElement)

const Modal = (props: Props) => {
  const { children } = props

  return ReactDOM.createPortal(
    <Styled.Backdrop>
      <Styled.Modal>{children}</Styled.Modal>
    </Styled.Backdrop>,
    portalElement,
  )
}

export default Modal
