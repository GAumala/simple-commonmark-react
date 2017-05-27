# Simple CommonMark React

This module renders Markdown as React components. Currently the only supported types are:

- paragraph
- header

## Install

```
yarn add simple-commonmark-react
```

## Usage 

```javascript
import React from 'react'
import CommonMark from 'commonmark'
import CommonMarkReact from 'simple-commonmark-react'

const parser = new CommonMark.Parser()

class MarkdownComponent extends React.Component {
  render() {
    const source = this.props.markdownText
    // props for every markdown element
    // we set className so that we can style each element with CSS
    const markdownProps = { className: 'markdown' }
    const ast = parser.parse(source)
    return (
      <div>
        { CommonMarkReact(ast, markdownProps) }  
      </div>
    )
  }  
}
```
}
