# Simple CommonMark React

[![npm version](https://badge.fury.io/js/simple-commonmark-react.svg)](https://badge.fury.io/js/simple-commonmark-react) [![Build Status](https://travis-ci.org/GAumala/simple-commonmark-react.svg?branch=master)](https://travis-ci.org/GAumala/simple-commonmark-react) [![Coverage Status](https://coveralls.io/repos/github/GAumala/simple-commonmark-react/badge.svg?branch=master)](https://coveralls.io/github/GAumala/simple-commonmark-react?branch=master) [![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

This module renders Markdown as React components using [Commonmark](https://www.npmjs.com/package/commonmark) as parser. You can find a demo app [here](ttps://gaumala.github.io/simple-commonmark-react/).

The whole markdown standard is not yet supported. Currently the only supported types are:

- block-quote
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

PR's are welcome. If you need a more production ready markdown module, try [commonmark-react-renderer](https://github.com/rexxars/commonmark-react-renderer).
I started this project because I needed an easier way to style the markdown components.

## Install

```
yarn add simple-commonmark-react
```

## Usage

This module exports a single attribute: a function called `renderNodes` which takes two arguments: `source` and `options`. It returns an array of React elements that you can easily render inside a div.

```typescript
const renderNodes = (source: string, options: RenderOptions | undefined): ReactElement<any>[] => {
  //implementation
}
```

`source` is the markdown string that you want to render. `options` is an optional argument that allows you to configure the rendering. All options are `undefined` by default. The following options are supported:

Name | Type | Description
--- | --- | ---
`className` | `string` | A string with the class name(s) to add to every single markdown component, useful if you want to style your components with CSS.
`allowSoftBreaks` | `boolean` | If `true`, all line breaks (`\n`) are rendered as `<br />` tags
`customRenderers` | `CustomRendererDict` | An object that contains functions to create custom renderers that override the default ones. See the [customization section](#customization)


### Example

```javascript
import React from 'react'
import { renderNodes } from 'simple-commonmark-react'

class MarkdownComponent extends React.Component {
  render() {
    const source = this.props.markdownText
    // we set className prop so that we can style each element with CSS
    const markdownOptions = { className: 'markdown' }
    return (
      <div>
        { renderNodes(source, markdownOptions) }  
      </div>
    )
  }  
}
```

## How It Works

This module parses your markdown with CommonMark, and then walks the generated AST and assigns each node type a different renderer. Renderers here are classes in [./src/renderers/](https://github.com/GAumala/simple-commonmark-react/tree/master/src/renderers). The renderer takes a node, a `renderOptions` object and a unique key, and returns a React element. The following table shows a rough aproximation of how each node is renderered.

Type | Renderer Class | Input Markdown | Output HTML
--- | --- | --- | ---
emph | [ItalicsRenderer](https://github.com/GAumala/simple-commonmark-react/blob/master/src/renderers/ItalicsRenderer.ts) | `*italics*` | `<em>italics</em>`
strong | [BoldRenderer](https://github.com/GAumala/simple-commonmark-react/blob/master/src/renderers/BoldRenderer.ts) | `**bold**` | `<strong>bold</strong>`
link | [LinkRenderer](https://github.com/GAumala/simple-commonmark-react/blob/master/src/renderers/LinkRenderer.ts) | `[link](/to/some/path)` | `<a href="/to/some/path">link</a>`
image | [ImageRenderer](https://github.com/GAumala/simple-commonmark-react/blob/master/src/renderers/ImageRenderer.ts) | `![link](/to/some/pic.png)` | `<img src="/to/some/pic.png">image</img>`
code | [CodeRenderer](https://github.com/GAumala/simple-commonmark-react/blob/master/src/renderers/CodeRenderer.ts) | ``inline code`` | `<code>inline code</code>`
code block | [CodeBlockRenderer](https://github.com/GAumala/simple-commonmark-react/blob/master/src/renderers/CodeBlockRenderer.ts) | `\n```\nblock code\n```\n` | `<pre><code>block code</code></pre>`
block quote | [QuoteBlockRenderer](https://github.com/GAumala/simple-commonmark-react/blob/master/src/renderers/QuoteBlockRenderer.ts) | `> this is a quote` | `<blockquote><p>this is a quote</p></blockquote>`
paragraph | [ParagraphRenderer](https://github.com/GAumala/simple-commonmark-react/blob/master/src/renderers/ParagraphRenderer.ts) | `a paragraph` | `<p>a paragraph</p>`
list (bullet) | [ListRenderer](https://github.com/GAumala/simple-commonmark-react/blob/master/src/renderers/ListRenderer.ts) & [ListItemRenderer](https://github.com/GAumala/simple-commonmark-react/blob/master/src/renderers/ListItemRenderer.ts) | `- item 1\n- item 2` | `<ul><li>item 1</li><li>item 2</li></ul>`
list (ordered) | [ListRenderer](https://github.com/GAumala/simple-commonmark-react/blob/master/src/renderers/ListRenderer.ts) & [ListItemRenderer](https://github.com/GAumala/simple-commonmark-react/blob/master/src/renderers/ListItemRenderer.ts) |`1. item 1\n2. item 2` | `<ol><li>item 1</li><li>item 2</li></ol>`
heading | [HeaderRenderer](https://github.com/GAumala/simple-commonmark-react/blob/master/src/renderers/HeaderRenderer.ts) | `# title` | `<h1>title</h1>`

Once you have an idea how each is rendered, you can style your components with CSS.

## Customization

If you can't get the style that you want with CSS or want to customize even further
you can override the default renderer classes from the previous section with your custom renderer. There are many ways to create new renderers. Let's start with a simple but practical
example: Let's create a new renderer for `link` that uses [React Router](https://reacttraining.com/react-router/) for navigation.

### Custom renderer with TypeScript

If you use TypeScript, you can just extend the default `LinkRenderer` and just
override the `renderNodeWithProps` method to use React Router's `Link` instead of an `<a>` tag.

```typescript
import { ReactElement, createElement } from 'react'
import { Link } from 'react-router-dom'
import LinkRenderer from 'simple-commonmark-react/src/renderers/LinkRenderer'

export default class ReactRouterLinkRender extends LinkRenderer {

  renderNodeWithProps(props: any): ReactElement<any> {
    //Link puts the url in 'to' rather than 'href', let's swap them
    const url = props.href
    delete props.href
    props.to = url
    return createElement(Link, props, [])
  }
}
```
`LinkRenderer`'s `renderNodeWithProps` recieves the props object ready for an `<a>` tag. It already contains `key`, `href`, and even `className` (if it was specified with `renderOptions`). So all we had to do is tweak it a little to play along with React Router and render the `Link` class.

### Custom renderer with ES6 classes

Alternatively, you could also extend `LinkRenderer` with an ES6 class like this:

```javascript
import { createElement } from 'react'
import { Link } from 'react-router-dom'
import LinkRenderer from 'simple-commonmark-react/src/renderers/LinkRenderer'

export default class ReactRouterLinkRenderer extends LinkRenderer {

  renderNodeWithProps(props) {
    //Link puts the url in 'to' rather than 'href', let's swap them
    const url = props.href
    delete props.href
    props.to = url
    return createElement(Link, props, [])
  }
}
```
As you can see this is identical to the TypeScript implementation, it only lacks type annotations.

### Custom renderer with regular JavaScript

If you are cool with plain old JavaScript you can implement the renderer as
a regular function that returns a `renderNode` function.

```javascript
var createElement = require('react').createElement
var Link = require('react-router-dom').Link

module.exports = function ReactRouterLinkRenderer(node, options) {
  return {
    renderNode: function (key) {
      //set key and class name from options
      var props = { key, className: options.className }
      //set title if there is any any
      var title = node.title
      if (title)
        props.title = title
      // set the link url
      props.to = node.destination

      return createElement(Link, props, [])
    }
  }

}
```

This one is a bit different, a lot more verbose since you can't extend the default  renderer and let it do all the heavy lifting. You have to manually get your props from the markdown node and `rendererOptions`. Also the function that you implement is `renderNode` and not `renderNodeWithProps` because the default renderers expose only `renderNode`, that's the function that the library will call when it's time to render.

All 3 implementations are equivalent, in fact, you can get the TypeScript implementation by importing [simple-commonmark-react-router](https://github.com/GAumala/simple-commonmark-react-router) into your project. once it is ready all you have to do is add the renderer to `renderOptions`'s `customRenderers`.   

```javascript
import React from 'react'
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'
import { renderNodes } from 'simple-commonmark-react'
import ReactRouterLinkRenderer from './ReactRouterLinkRenderer'

class MarkdownComponent extends React.Component {
  render() {
    const source = this.props.markdownText
    const markdownOptions = {
      className: 'markdown',
      customRenderers: { link: ReactRouterLinkRenderer }
    }

    return (
      <Router>
        //Here you could put your routes
        <div>
          { renderNodes(source, markdownOptions) }  
        </div>
      </Router>
    )
  }  
}
```

As you can see, we use 'link' as key to insert `ReactRouterLinkRenderer` because that's the string that CommonMark uses to identify that particular Markdown element. That's how the library knows that you are overriding `link` and not `image` or `paragraph`. The keys you can use for overriding are: `text`, `softbreak`, `emph`, `strong`, `link`, `image`, `code`, `document`, `paragraph`, `item`, `list`, `heading`, `code_block`, `block_quote`. If you use the wrong key, your renderer will not be used.
