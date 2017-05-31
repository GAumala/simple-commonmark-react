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

This module exports a single attribute: a funcion called `renderNodes` which takes two arguments: `source` and `options`. It returns an array of React elements that you can easily render inside a div.

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

## Styling

The reccomended way to style your components is to set a class name to the `rendererOptions` object and use CSS. To control the style for each markdown element you should know which html tags are used to render it. The following table shows a rough aproximation of how some markdown elements are converted to HTML. it isn't too detailed, just the bare minimum for you to understand which tags you should style.

Type | Input Markdown | Output HTML
--- | --- | ---
emph | `*italics*` | `<em>italics</em>`
strong | `**bold**` | `<strong>bold</strong>`
link | `[link](/to/some/path)` | `<a href="/to/some/path">link</a>`
image | `![link](/to/some/pic.png)` | `<img src="/to/some/pic.png">image</img>`
code | ``inline code`` | `<code>inline code</code>`
block quote | `\n```\nblock code\n```\n` | `<pre><code>block code</code></pre>`
paragraph | `a paragraph` | `<p>a paragraph</p>`
list (bullet) | `- item 1\n- item 2` | `<ul><li>item 1</li><li>item 2</li></ul>`
list (ordered) | `1. item 1\n2. item 2` | `<ol><li>item 1</li><li>item 2</li></ol>`
heading | `# title` | `<h1>title</h1>`

## Customization

If you can't get the style that you want with CSS or want to customize even further
you can override the default renderers for every markdown type with your custom renderer. There are many ways to create new renderers. Let's start with a simple but practical
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
As you can see this is identical to the TypeScript implementation, it only lacks type annotaions.

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

All 3 implementations are equivalent, once it is ready all you have to do is add the renderer to `renderOptions`'s `customRenderers`.   

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

As you can see, we use 'link' as key to insert `ReactRouterLinkRenderer` because that's the string that CommonMark uses to identify that particular Markdown element. That's how the library knows that you are overriding `link` and not `image` or `paragraph`. The keys you can use for overriding are: `text`, `softbreak`, `emph`, `strong`, `link`, `image`, `code`, `document`, `paragraph`, `item`, `list`, `heading`, `code_block`. If you use the wrong key, your renderer will not be used.
