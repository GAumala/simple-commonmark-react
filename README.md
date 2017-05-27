# Simple CommonMark React

[![Build Status](https://travis-ci.org/GAumala/simple-commonmark-react.svg?branch=master)](https://travis-ci.org/GAumala/simple-commonmark-react)

This module renders Markdown as React components using [Markdown.js](https://www.npmjs.com/package/commonmark) as parser.

This is still a work in progress and very limited. Currently the only supported types are:

- code
- code_block
- emph
- header
- paragraph
- softbreak
- strong

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
        { CommonMarkReact.renderNodes(ast, markdownProps) }  
      </div>
    )
  }  
}
```
}
