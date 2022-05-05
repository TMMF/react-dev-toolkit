import * as React from "react"
import styled from "styled-components"
import IconButton from "../atoms/IconButton"
import { ToolIcon } from "../atoms/Icons"
import { ColorMode } from "../utils/constants"
import { elevatedContainer } from "../utils/styles"
import DevToolkitModal from "./DevToolkitModal"

const Styled = {
  Button: styled(IconButton)`
    width: 48px;
    height: 48px;
    border-radius: 8px;

    ${elevatedContainer("rgba(0, 0, 0, 0.05)")};
    transition: box-shadow 0.25s, border 0.25s, color 0.25s, transform 0.25s;

    &:hover {
      ${elevatedContainer("rgba(0, 0, 0, 0.1)")};
    }

    &:active {
      ${elevatedContainer("rgba(0, 0, 0, 0.15)", 1.5)};
      transition: box-shadow 0.1s, border 0.1s, color 0.1s, transform 0.1s;
      transform: translate(0, 2px);
    }
  `,
}

type Props = {}

// TODO: style the button so that it floats in a corner based on a prop, then also allow for relative positioning with prop as well and classname for styling
const DevToolkitButton = (props: Props) => {
  // TODO: change this to false when done
  const [visible, toggleVisibility] = React.useReducer((s) => !s, true)
  const [colorMode, toggleColorMode] = React.useReducer(
    (s) => (s === ColorMode.Light ? ColorMode.Dark : ColorMode.Light),
    ColorMode.Light,
  )

  return (
    <>
      <Styled.Button Icon={<ToolIcon />} onClick={toggleVisibility} />
      {visible ? (
        <DevToolkitModal
          onClose={toggleVisibility}
          colorMode={colorMode}
          toggleColorMode={toggleColorMode}
        />
      ) : null}
    </>
  )
}

export default DevToolkitButton
