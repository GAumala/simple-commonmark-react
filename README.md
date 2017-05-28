# Simple CommonMark React

[![Build Status](https://travis-ci.org/GAumala/simple-commonmark-react.svg?branch=master)](https://travis-ci.org/GAumala/simple-commonmark-react) [![Coverage Status](https://coveralls.io/repos/github/GAumala/simple-commonmark-react/badge.svg?branch=master)](https://coveralls.io/github/GAumala/simple-commonmark-react?branch=master)

This module renders Markdown as React components using [Markdown.js](https://www.npmjs.com/package/commonmark) as parser.

This is still a work in progress and very limited. Currently the only supported types are:

- code
- code_block
- emph
- header
- image
- item
- link
- list
- paragraph
- softbreak
- strong

If you need a more production ready markdown module, try [commonmark-react-renderer](https://github.com/rexxars/commonmark-react-renderer).
I started this project because I needed an easier way to style the markdown components.

## Install

```
yarn add simple-commonmark-react
```

## Usage

This module exports a single attribute: a funcion called `renderNodes` which takes two arguments: `source` and `customProps`. It returns an array of React elements that you can easily render inside a div.

```typescript
const renderNodes = (source: string, customProps: object | undefined): ReactElement<any>[] => {
  //implementation
}
```

`source` is the markdown string that you want to render. `customProps` is an optional argument with the props that you want to pass to every single markdown component. `customProps` is useful if you want to set a special class to every component so that you can style it with CSS. It is still an experimental API so it might change in the future.

### Example

```javascript
import React from 'react'
import CommonMarkReact from 'simple-commonmark-react'

class MarkdownComponent extends React.Component {
  render() {
    const source = this.props.markdownText
    // we set className prop so that we can style each element with CSS
    const markdownProps = { className: 'markdown' }
    return (
      <div>
        { CommonMarkReact.renderNodes(source, markdownProps) }  
      </div>
    )
  }  
}
```
}
