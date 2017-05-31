const React = require('react')
const ReactDOMServer = require('react-dom/server')

const { renderNodes } = require('./CommonMarkReact.js')

const renderToString = (markdown, rendererKey, customRenderer) => {
  const options = { customRenderers: {} }
  options.customRenderers[rendererKey] = customRenderer
  const nodes = renderNodes(markdown, options)
  const rootElement = React.createElement('div', null, nodes)
  return ReactDOMServer.renderToStaticMarkup(rootElement)
}

function GenericRenderer(className) {
  return function (node, options) {
    return {
      renderNode: function (key) {
        return React.createElement('div', { key, className }, [])
      }
    }
  }
}

test('Renders custom bold', () => {
  const customRenderer = GenericRenderer('bold')
  const markdown = '**hello world**\n'
  expectedHtml = '<div><p><div class=\"bold\">hello world</div></p></div>'
  const renderedString = renderToString(markdown, 'strong', customRenderer)
  expect(renderedString).toEqual(expectedHtml)
})

test('Renders custom code block', () => {
  const customRenderer = GenericRenderer('code-block')
  const markdown = '```\nhello world\n```'
  expectedHtml = '<div><div class=\"code-block\"></div></div>'
  const renderedString = renderToString(markdown, 'code_block', customRenderer)
  expect(renderedString).toEqual(expectedHtml)
})

test('Renders custom inline code', () => {
  const customRenderer = GenericRenderer('code')
  const markdown = '`hello world`'
  expectedHtml = '<div><p><div class=\"code\"></div></p></div>'
  const renderedString = renderToString(markdown, 'code', customRenderer)
  expect(renderedString).toEqual(expectedHtml)
})

test('Renders custom header', () => {
  const customRenderer = GenericRenderer('header')
  const markdown = '# hello world'
  expectedHtml = '<div><div class=\"header\">hello world</div></div>'
  const renderedString = renderToString(markdown, 'heading', customRenderer)
  expect(renderedString).toEqual(expectedHtml)
})

test('Renders custom image', () => {
  const customRenderer = GenericRenderer('image')
  const markdown = '![hello world](/pic.png)'
  expectedHtml = '<div><p><div class=\"image\"></div>hello world</p></div>'
  const renderedString = renderToString(markdown, 'image', customRenderer)
  expect(renderedString).toEqual(expectedHtml)
})

test('Renders custom italics', () => {
  const customRenderer = GenericRenderer('italics')
  const markdown = '*hello world*\n'
  expectedHtml = '<div><p><div class=\"italics\">hello world</div></p></div>'
  const renderedString = renderToString(markdown, 'emph', customRenderer)
  expect(renderedString).toEqual(expectedHtml)
})

test('Renders custom linebreak', () => {
  const customRenderer = GenericRenderer('line-break')
  const markdown = 'hello\nworld'
  expectedHtml = '<div><p>hello<div class=\"line-break\"></div>world</p></div>'
  const renderedString = renderToString(markdown, 'softbreak', customRenderer)
  expect(renderedString).toEqual(expectedHtml)
})

test('Renders custom link', () => {
  const customRenderer = GenericRenderer('link')
  const markdown = '[hello world](/home)'
  expectedHtml = '<div><p><div class=\"link\">hello world</div></p></div>'
  const renderedString = renderToString(markdown, 'link', customRenderer)
  expect(renderedString).toEqual(expectedHtml)
})

test('Renders custom list', () => {
  const customRenderer = GenericRenderer('list')
  const markdown = '- hello world\n'
  expectedHtml = '<div><div class=\"list\"><li>hello world</li></div></div>'
  const renderedString = renderToString(markdown, 'list', customRenderer)
  expect(renderedString).toEqual(expectedHtml)
})

test('Renders custom list item', () => {
  const customRenderer = GenericRenderer('list-item')
  const markdown = '- hello world\n'
  expectedHtml = '<div><ul><div class=\"list-item\">hello world</div></ul></div>'
  const renderedString = renderToString(markdown, 'item', customRenderer)
  expect(renderedString).toEqual(expectedHtml)
})

test('Renders custom paragraph', () => {
  const customRenderer = GenericRenderer('paragraph')
  const markdown = 'hello world\n'
  expectedHtml = '<div><div class=\"paragraph\">hello world</div></div>'
  const renderedString = renderToString(markdown, 'paragraph', customRenderer)
  expect(renderedString).toEqual(expectedHtml)
})

test('Renders custom text', () => {
  const customRenderer = GenericRenderer('text')
  const markdown = 'hello world\n'
  expectedHtml = '<div><p><div class=\"text\"></div></p></div>'
  const renderedString = renderToString(markdown, 'text', customRenderer)
  expect(renderedString).toEqual(expectedHtml)
})
