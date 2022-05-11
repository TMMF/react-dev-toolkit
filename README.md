# `react-dev-toolkit`

_Improving the development process for complex React applications_

At the moment, `react-dev-toolkit` is a proof-of-concept realtime mocking tool
for React applications. The underlying code and public interface is very much in
flux and it is recommended that you do not use this as a dependency unless
you're comfortable with experimental code and potentially breaking changes for
every release until a production release is ready (v1.0.0).

The core goal of the project is to simplify the development of complex React
applications with realtime data mocking to test different scenarios. Feel free
to suggest ideas for achieving this goal, but understand that for the most part
this will likely remain a solo project until an production release is created.

## Installation

```bash
npm install react-dev-toolkit
```

This package utilizes two main dependencies:

- [zustand](https://github.com/pmndrs/zustand) - Used for internal state
  management of mocked data
- [styled-components](https://styled-components.com/) - Used for styling
  internal components

Future work may result in the removal `styled-components` as a required
dependency in order to limit the number of needed dependencies further, but that
hasn't been decided yet. Zustand or another state management library will likely
remain a necessary dependency due to the need to manage state within this
package.

## Quick Use Instructions

Once installed, you can quickly include the toolkit with the following:

First, add the `DevToolkitButton` somewhere within your application. Generally
with the rest of your providers or at the root of your application is best.

```diff
+ import { DevToolkitButton } from "react-dev-toolkit"

...

const Component = () => {
  return (
    <>
      ...
+     <DevToolkitButton />
    </>
  )
}

```

Second, you can begin defining development controls for fields and use them
directly.

```diff
+ import { dev, StringControl } from "react-dev-toolkit"

+ const useDevString = dev(StringControl({ name: "Example String" }))

const Component = (props) => {
- const str = "Non-Mocked String"
+ const str = useDevString("Non-Mocked String")

  ...
}
```

With both of those done, you'll have a toolkit button floating on the bottom
left of your screen. When you click on it, a modal will show up which will allow
you to specify your mocked data. Once you're happy with your mocked data, you
can click on the checkbox to switch between using the real data and mocked data
with ease. See the video below for a visual presentation of this.

If you further curious, check out the `examples/` folder. Each sub-folder is an
example application that makes use of the toolkit. It's a little sparse at the
moment, but it should help out with understanding how to use the toolkit.

## Repository Development

If you'd like to clone the repository and mess around with the proof-of-concept
code yourself, feel free to do so. The main scripts you'll want to use are:

- `npm run compile` - Compiles the Typescript source code into a Javascript NPM
  package
- `npm run verify` - Runs type checking
- `npm publish` - Publishes the Javascript NPM package
- `npm run example:*` - Runs example applications
  - `npm run example:basic` - Runs a basic example application
  - `npm run example:comprehensive` - Runs a comprehensive example application
    with all of the available controls

As development of the repository progresses, more scripts will be introduced to
help out with testing, linting, etc.

## Contribution Guidelines

For the time being, no contributions will be accepted and issues/discussions are
turned off. As the project beings to advance from being a simple
proof-of-concept, then I'll begin to open these up and create a contributions
document/process.

## Screenshots / Videos

**All of the currently available controls:**

![Toolkit Showcase](https://user-images.githubusercontent.com/3113914/167779621-fe40f612-ec99-4089-ae5a-ca21a9aa1392.png)

**Short showcase of the functionality:**

https://user-images.githubusercontent.com/3113914/167779116-600f8674-194c-4509-8c27-f86a247efacb.mov
