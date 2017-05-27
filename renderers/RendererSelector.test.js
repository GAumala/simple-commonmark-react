const Commonmark = require('commonmark')
const parser = new Commonmark.Parser()

const RendererSelector = require('./RendererSelector.js').default
const BoldRenderer = require('./BoldRenderer.js').default
const DocumentRenderer = require('./DocumentRenderer.js').default
const ItalicsRenderer = require('./ItalicsRenderer.js').default
const HeaderRenderer = require('./HeaderRenderer.js').default
const ParagraphRenderer = require('./ParagraphRenderer.js').default

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

test('maps emph nodes to ItalicsRenderer', () => {
  const emphNode = getTestingNode('*this is italics*').lastChild
  const renderer = RendererSelector(emphNode)
  expect(renderer instanceof ItalicsRenderer).toBe(true)
})

test('maps strong nodes to BoldRenderer', () => {
  const strongNode = getTestingNode('**this is bold**').lastChild
  const renderer = RendererSelector(strongNode)
  expect(renderer instanceof BoldRenderer).toBe(true)
})
