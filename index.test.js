const React = require('react')
const ReactDOMServer = require('react-dom/server')
const Commonmark = require('commonmark')

const parser = new Commonmark.Parser()
const SimpleCommonMarkReact = require('./index.js').default

test('Renders markdown tags: header and paragraph with custom class names', () => {
  const markdown = '## Title\n\nHello World!\n'
  const ast = parser.parse(markdown)
  const nodes = SimpleCommonMarkReact(ast, {className: 'markdown'})
  const rootElement = React.createElement('div', null, nodes)
  const renderedString = ReactDOMServer.renderToStaticMarkup(rootElement)
  const expectedHtml = '<div><h2 class="markdown">Title</h2><p class="markdown">Hello World!</p></div>'
  expect(renderedString).toEqual(expectedHtml)
})

test('Renders inline markdown tags: bold, code and emph with custom class names', () => {
  const markdown = 'Hello World!\n*this* is italics, **this** is bold and `this` is code'
  const ast = parser.parse(markdown)
  const nodes = SimpleCommonMarkReact(ast, {className: 'markdown'})
  const rootElement = React.createElement('div', null, nodes)
  const renderedString = ReactDOMServer.renderToStaticMarkup(rootElement)
  const expectedHtml = '<div><p class="markdown">Hello World!<br/><emph class="markdown">this</emph> is italics, <strong class="markdown">this</strong> is bold and <code class="markdown">this</code> is code</p></div>'
  expect(renderedString).toEqual(expectedHtml)
})
