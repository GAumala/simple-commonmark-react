const Commonmark = require('commonmark')
const parser = new Commonmark.Parser()

const RendererSelector = require('./RendererSelector.js').default
const HeaderRenderer = require('./HeaderRenderer.js').default
const ParagraphRenderer = require('./ParagraphRenderer.js').default
const DocumentRenderer = require('./DocumentRenderer.js').default

const getTestingNode = (source) => {
  const ast = parser.parse(source)
  return ast.lastChild
}

test('maps header nodes to HeaderRenderer', () => {
  const headerNode = getTestingNode('# This is a header')
  const renderer = RendererSelector(headerNode)
  expect(renderer instanceof HeaderRenderer).toBe(true)
})

test('maps paragraph nodes to ParagraphRenderer', () => {
  const paragraphNode = getTestingNode('This is a paragraph\n')
  const renderer = RendererSelector(paragraphNode)
  expect(renderer instanceof ParagraphRenderer).toBe(true)
})

test('maps document nodes to DocumentRenderer', () => {
  const documentNode = parser.parse('This is a paragraph\n')
  const renderer = RendererSelector(documentNode)
  expect(renderer instanceof DocumentRenderer).toBe(true)
})
