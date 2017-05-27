const React = require('react')
const ReactDOMServer = require('react-dom/server')

const CommonMarkReact = require('./CommonMarkReact.js').default

const renderToString = (markdown) => {
  const nodes = CommonMarkReact(markdown, {className: 'markdown'})
  const rootElement = React.createElement('div', null, nodes)
  return ReactDOMServer.renderToStaticMarkup(rootElement)
}
test('Renders markdown tags: header and paragraph with custom class names', () => {
  const markdown = '## Title\n\nHello World!\n'
  const expectedHtml = '<div><h2 class="markdown">Title</h2><p class="markdown">Hello World!</p></div>'
  const renderedString = renderToString(markdown)
  expect(renderedString).toEqual(expectedHtml)
})

test('Renders inline markdown tags: bold, code and emph with custom class names', () => {
  const markdown = 'Hello World!\n*this* is italics, **this** is bold and `this` is code'
  const expectedHtml = '<div><p class="markdown">Hello World!<br/><em class="markdown">this</em> is italics, <strong class="markdown">this</strong> is bold and <code class="markdown">this</code> is code</p></div>'
  const renderedString = renderToString(markdown)
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


test('Renders correctly when customProps is undefined', () => {
  const markdown = '# Code Test\n\n Check this code\n\n```c\n\n#include <stdio.h>\n```'
  const nodes = CommonMarkReact(markdown)
  const rootElement = React.createElement('div', null, nodes)
  const renderedString =  ReactDOMServer.renderToStaticMarkup(rootElement)
  const expectedHtml = '<div><h1>Code Test</h1><p>Check this code</p><pre class="language-c "><code>\n#include &lt;stdio.h&gt;\n</code></pre></div>'
  expect(renderedString).toEqual(expectedHtml)
})
