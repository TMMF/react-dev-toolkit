import { css } from "styled-components"

const range = (start: number, end: number) => {
  const res = new Array(end - start)
  for (let i = 0; i < res.length; i++) {
    res[i] = start + i
  }
  return res
}

const buildBoxShadow = (color: string, base: number = 2) =>
  range(0, 5)
    .map((i) => Math.pow(base, i))
    .map((offset) => `0 ${offset}px ${offset}px ${color}`)
    .join(", ")

// TODO: define 'elevations' instead of using a direct color

export const elevatedContainer = (color: string, base: number = 2) => css`
  box-shadow: ${buildBoxShadow(color, base)};
  border: 1px solid ${color};
`
