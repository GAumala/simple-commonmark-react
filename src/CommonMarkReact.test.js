const React = require('react')
const ReactDOMServer = require('react-dom/server')

const { renderNodes} = require('./CommonMarkReact.js')

const renderToString = (markdown, options) => {
  const nodes = renderNodes(markdown, Object.assign({className: 'markdown'}, options))
  const rootElement = React.createElement('div', null, nodes)
  return ReactDOMServer.renderToStaticMarkup(rootElement)
}

test('Renders markdown tags: header and paragraph with custom class names', () => {
  const markdown = '## Title\n\nHello World!\n'
  const expectedHtml = '<div><h2 class="markdown">Title</h2><p class="markdown">Hello World!</p></div>'
  const renderedString = renderToString(markdown)
  expect(renderedString).toEqual(expectedHtml)
})

test('Renders inline markdown tags: bold, code, softbreak and emph with custom class names', () => {
  const markdown = 'Hello World!\n*this* is italics, **this** is bold and `this` is code'
  const expectedHtml = '<div><p class="markdown">Hello World!\n<em class="markdown">this</em> is italics, <strong class="markdown">this</strong> is bold and <code class="markdown">this</code> is code</p></div>'
  const renderedString = renderToString(markdown)
  expect(renderedString).toEqual(expectedHtml)
})

test('Renders line breaks as <br/> if allowSoftBreaks option is active', () => {
  const markdown = 'Hello World!\n*this* is italics, **this** is bold and `this` is code'
  const expectedHtml = '<div><p class="markdown">Hello World!<br/><em class="markdown">this</em> is italics, <strong class="markdown">this</strong> is bold and <code class="markdown">this</code> is code</p></div>'
  const renderedString = renderToString(markdown, {allowSoftBreaks: true})
  expect(renderedString).toEqual(expectedHtml)
})

test('Renders markdown tags: header, paragraph and code_block with custom class names', () => {
  const markdown = '# Code Test\n\n Check this code\n\n```c\n\n#include <stdio.h>\n```'
  const renderedString = renderToString(markdown)
  const expectedHtml = '<div><h1 class="markdown">Code Test</h1><p class="markdown">Check this code</p><pre class="language-c markdown"><code class="markdown">\n#include &lt;stdio.h&gt;\n</code></pre></div>'
  expect(renderedString).toEqual(expectedHtml)
})

test('Renders code_block without language name with custom class names', () => {
  const markdown = '# Code Test\n\n Check this code\n\n```\nSome pseudo code\n```'
  const renderedString = renderToString(markdown)
  const expectedHtml = '<div><h1 class="markdown">Code Test</h1><p class="markdown">Check this code</p><pre class="markdown"><code class="markdown">Some pseudo code\n</code></pre></div>'
  expect(renderedString).toEqual(expectedHtml)
})

test('Renders markdown link with custom class names', () => {
  const markdown = 'Check out this [link](https://fsf.org) and [this one](/local/path "some server url") with title'
  const renderedString = renderToString(markdown)
  const expectedHtml = '<div><p class="markdown">Check out this <a class="markdown" href="https://fsf.org">link</a> and <a class="markdown" title="some server url" href="/local/path">this one</a> with title</p></div>'
  expect(renderedString).toEqual(expectedHtml)
})

test('Renders markdown images with custom class names', () => {
  const markdown = 'Check out this ![image](https://somewebsite.org/pic.png) it is inline\n\nAlso this one:\n\n![local pic](/public/photo.png "my pic")'
  const renderedString = renderToString(markdown)
  const expectedHtml = '<div><p class="markdown">Check out this <img class="markdown" alt="image" src="https://somewebsite.org/pic.png"/> it is inline</p><p class="markdown">Also this one:</p><p class="markdown"><img class="markdown" title="my pic" alt="local pic" src="/public/photo.png"/></p></div>'
  expect(renderedString).toEqual(expectedHtml)
})

test('Renders bullet lists with custom class names', () => {
  const markdown = '- item with [link](https://eff.org)\n- item with `code`\n- item with **bold**\n- item with *emph*\n'
  const renderedString = renderToString(markdown)
  const expectedHtml = '<div><ul class="markdown"><li class="markdown">item with <a class="markdown" href="https://eff.org">link</a></li><li class="markdown">item with <code class="markdown">code</code></li><li class="markdown">item with <strong class="markdown">bold</strong></li><li class="markdown">item with <em class="markdown">emph</em></li></ul></div>'
  expect(renderedString).toEqual(expectedHtml)
})

test('Renders ordered lists with custom class names', () => {
  const markdown = '1) item with [link](https://eff.org)\n2) item with `code`\n3) item with **bold**\n4) item with *emph*\n'
  const renderedString = renderToString(markdown)
  const expectedHtml = '<div><ol class="markdown"><li class="markdown">item with <a class="markdown" href="https://eff.org">link</a></li><li class="markdown">item with <code class="markdown">code</code></li><li class="markdown">item with <strong class="markdown">bold</strong></li><li class="markdown">item with <em class="markdown">emph</em></li></ol></div>'
  expect(renderedString).toEqual(expectedHtml)
})

test('Renders loose lists with custom class names', () => {
  const markdown = '- item with [link](https://eff.org)\n\n- item with *emph*\n\n'
  const renderedString = renderToString(markdown)
  const expectedHtml = '<div><ul class="markdown"><li class="markdown"><p class="markdown">item with <a class="markdown" href="https://eff.org">link</a></p></li><li class="markdown">item with <em class="markdown">emph</em></li></ul></div>'
  expect(renderedString).toEqual(expectedHtml)
})

test('Renders correctly when customProps is undefined', () => {
  const markdown = '# Code Test\n\n Check this code\n\n```c\n\n#include <stdio.h>\n```'
  const nodes = renderNodes(markdown)
  const rootElement = React.createElement('div', null, nodes)
  const renderedString =  ReactDOMServer.renderToStaticMarkup(rootElement)
  const expectedHtml = '<div><h1>Code Test</h1><p>Check this code</p><pre class="language-c "><code>\n#include &lt;stdio.h&gt;\n</code></pre></div>'
  expect(renderedString).toEqual(expectedHtml)
})
