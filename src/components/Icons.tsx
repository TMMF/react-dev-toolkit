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
