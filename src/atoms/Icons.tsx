import * as React from "react"
import styled from "styled-components"

const Styled = {
  Svg: styled.svg`
    width: 24px;
    height: 24px;
    stroke-width: 2px;
  `,
}

type Props = Omit<React.SVGProps<SVGSVGElement>, "ref">

const createIcon = (
  ...paths: string[]
): React.MemoExoticComponent<(props: Props) => JSX.Element> => {
  const Icon = (props: Props): JSX.Element => (
    <Styled.Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {paths.map((p) => (
        <path key={p} d={p} />
      ))}
    </Styled.Svg>
  )

  return React.memo(Icon)
}

// ---

export const CloseIcon = createIcon("M18 6 6 18M6 6l12 12")

export const SunIcon = createIcon(
  "M12 7a5 5 0 1 0 0 10 5 5 0 1 0 0-10zM12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42",
)

export const MoonIcon = createIcon(
  "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z",
)

export const HelpIcon = createIcon(
  "M12 2a10 10 0 1 0 0 20 10 10 0 1 0 0-20z",
  "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3m.08 4h.01",
)

export const ToolIcon = createIcon(
  "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z",
)

export const ErrorIcon = createIcon(
  "M7.86 2h8.28L22 7.86v8.28L16.14 22H7.86L2 16.14V7.86L7.86 2zM15 9l-6 6m0-6 6 6",
)

export const SquareIcon = createIcon(
  "M5 3h14c1.108 0 2 .892 2 2v14c0 1.108-.892 2-2 2H5c-1.108 0-2-.892-2-2V5c0-1.108.892-2 2-2Z",
)

export const SquareCheckIcon = createIcon(
  "m9 11 3 3L22 4",
  "M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11",
)

export const SquarePlusIcon = createIcon(
  "M5 3h14c1.108 0 2 .892 2 2v14c0 1.108-.892 2-2 2H5c-1.108 0-2-.892-2-2V5c0-1.108.892-2 2-2Zm7 5v8m-4-4h8",
)

export const SquareMinusIcon = createIcon(
  "M5 3h14c1.108 0 2 .892 2 2v14c0 1.108-.892 2-2 2H5c-1.108 0-2-.892-2-2V5c0-1.108.892-2 2-2Zm3 9h8",
)

export const ChevronDownIcon = createIcon("m6 9 6 6 6-6")
