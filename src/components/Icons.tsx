import * as React from "react"

type Props = React.SVGProps<SVGSVGElement>

const createIcon = (
  ...paths: string[]
): React.MemoExoticComponent<(props: Props) => JSX.Element> => {
  const Icon = (props: Props): JSX.Element => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {paths.map((p) => (
        <path key={p} d={p} />
      ))}
    </svg>
  )

  return React.memo(Icon)
}

export const CloseIcon = createIcon("M18 6 6 18M6 6l12 12")
