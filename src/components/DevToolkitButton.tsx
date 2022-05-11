import * as React from "react"
import styled, { css } from "styled-components"
import IconButton from "../atoms/IconButton"
import { ToolIcon } from "../atoms/Icons"
import { ColorMode, Location } from "../utils/constants"
import { elevatedContainer } from "../utils/styles"
import { CSSMeasure } from "../utils/types"
import DevToolkitModal from "./DevToolkitModal"

const getFloatCss = (location: Location, padding: CSSMeasure) => {
  switch (location) {
    case Location.Inline:
      return css`
        position: relative;
      `
    case Location.FloatBottomLeft:
      return css`
        position: fixed;
        bottom: ${padding};
        left: ${padding};
      `
    case Location.FloatBottomRight:
      return css`
        position: fixed;
        bottom: ${padding};
        right: ${padding};
      `
    case Location.FloatTopLeft:
      return css`
        position: fixed;
        top: ${padding};
        left: ${padding};
      `
    case Location.FloatTopRight:
      return css`
        position: fixed;
        top: ${padding};
        right: ${padding};
      `
  }
}

const Styled = {
  Button: styled(IconButton)<{ $location: Location; $padding: CSSMeasure }>`
    width: 48px;
    height: 48px;
    border-radius: 8px;
    background-color: white;

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

    ${(props) => getFloatCss(props.$location, props.$padding)};
  `,
}

type Props = {
  location?: Location
  padding?: CSSMeasure
  className?: string
}

const DevToolkitButton = (props: Props) => {
  const { location, padding, className } = props

  const [visible, toggleVisibility] = React.useReducer((s) => !s, false)
  const [colorMode, toggleColorMode] = React.useReducer(
    (s) => (s === ColorMode.Light ? ColorMode.Dark : ColorMode.Light),
    ColorMode.Light,
  )

  return (
    <>
      <Styled.Button
        Icon={<ToolIcon />}
        onClick={toggleVisibility}
        className={className}
        $location={location ?? Location.FloatBottomLeft}
        $padding={padding ?? "20px"}
      />
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
