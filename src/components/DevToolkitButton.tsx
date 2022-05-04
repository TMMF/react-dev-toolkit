import * as React from "react"
import styled from "styled-components"
import IconButton from "../atoms/IconButton"
import { ToolIcon } from "../atoms/Icons"
import { elevatedContainer } from "../utils/styles"
import DevToolkitModal from "./DevToolkitModal"

const Styled = {
  Button: styled(IconButton)`
    width: 48px;
    height: 48px;
    border-radius: 8px;

    ${elevatedContainer("rgba(0, 0, 0, 0.05)")};
    transition: box-shadow 0.25s, border 0.25s, color 0.25s;

    &:hover {
      ${elevatedContainer("rgba(0, 0, 0, 0.1)")};
    }

    &:active {
      ${elevatedContainer("rgba(0, 0, 0, 0.1)", 1.5)};
      transition: box-shadow 0.1s, border 0.1s, color 0.1s;
    }
  `,
}

type Props = {}

// TODO: style the button so that it floats in a corner based on a prop, then also allow for relative positioning with prop as well and classname for styling
const DevToolkitButton = (props: Props) => {
  const [visible, toggle] = React.useReducer((s) => !s, false)

  return (
    <>
      <Styled.Button Icon={<ToolIcon />} onClick={toggle} />
      {visible ? <DevToolkitModal onClose={toggle} /> : null}
    </>
  )
}

export default DevToolkitButton
