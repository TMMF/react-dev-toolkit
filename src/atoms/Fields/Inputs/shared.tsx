import { css } from "styled-components"

export const ContainerStyle = css<{ $hasError?: boolean }>`
  width: 100%;
  padding: 8px;
  font-size: 14px;
  font-family: monospace;

  border: 1px solid #aaaaaa;
  border-radius: 4px;

  border-color: ${(props) => (props.$hasError ? "#ff6961" : null)};

  &:hover {
    border-color: ${(props) => (!props.$hasError ? "#464646" : null)};
  }

  &:focus {
    border: 2px solid #464646;
    outline: none;
    padding: 7px;
  }
`
