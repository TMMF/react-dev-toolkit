import * as React from "react"
import * as ReactDOM from "react-dom"
import styled from "styled-components"
import { elevatedContainer } from "../utils/styles"

const Styled = {
  Backdrop: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    position: absolute;
    top: 0;
    left: 0;

    width: 100vw;
    height: 100vh;

    pointer-events: none;
  `,
  Modal: styled.div`
    background-color: white;
    padding: 24px;
    border-radius: 4px;
    ${elevatedContainer("rgba(0, 0, 0, 0.05)")};
    pointer-events: auto;
  `,
}

type Props = { children: React.ReactNode; className?: string }

const portalElement = document.createElement("div")
document.body.insertAdjacentElement("beforeend", portalElement)

const Modal = (props: Props) => {
  const { children, className } = props

  return ReactDOM.createPortal(
    <Styled.Backdrop>
      <Styled.Modal className={className}>{children}</Styled.Modal>
    </Styled.Backdrop>,
    portalElement,
  )
}

export default Modal
