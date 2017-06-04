const Commonmark = require('commonmark')
const parser = new Commonmark.Parser()

const RendererSelector = require('./RendererSelector.ts').default
const BoldRenderer = require('./BoldRenderer.ts').default
const CodeRenderer = require('./CodeRenderer.ts').default
const CodeBlockRenderer = require('./CodeBlockRenderer.ts').default
const NullRenderer = require('./NullRenderer.ts').default
const HeaderRenderer = require('./HeaderRenderer.ts').default
const ImageRenderer = require('./ImageRenderer.ts').default
const ItalicsRenderer = require('./ItalicsRenderer.ts').default
const LineBreakRenderer = require('./LineBreakRenderer.ts').default
const LinkRenderer = require('./LinkRenderer.ts').default
const ListItemRenderer = require('./ListItemRenderer.ts').default
const ListRenderer = require('./ListRenderer.ts').default
const ParagraphRenderer = require('./ParagraphRenderer.ts').default

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

test('maps document nodes to NullRenderer', () => {
  const documentNode = parser.parse('This is a paragraph\n')
  const renderer = RendererSelector(documentNode)
  expect(renderer instanceof NullRenderer).toBe(true)
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

test('maps code nodes to CodeRenderer', () => {
  const codeNode = getTestingNode('`this is code`').lastChild
  const renderer = RendererSelector(codeNode)
  expect(renderer instanceof CodeRenderer).toBe(true)
})

test('maps linebreak nodes to LineBreakRenderer', () => {
  const lineBreakNode = getTestingNode('this has\nline break').lastChild.prev
  const renderer = RendererSelector(lineBreakNode)
  expect(renderer instanceof LineBreakRenderer).toBe(true)
})

test('maps code_block nodes to CodeBlockRenderer', () => {
  const codeBlockNode = getTestingNode('```c\n#include <stdio.h>\n```')
  const renderer = RendererSelector(codeBlockNode)
  expect(renderer instanceof CodeBlockRenderer).toBe(true)
})

test('maps link nodes to LinkRenderer', () => {
  const linkNode = getTestingNode('Here is a [link](https://fsf.org)').lastChild
  const renderer = RendererSelector(linkNode)
  expect(renderer instanceof LinkRenderer).toBe(true)
})

test('maps image nodes to ImageRenderer', () => {
  const imageNode = getTestingNode('Here is an ![image](/pic.png)').lastChild
  const renderer = RendererSelector(imageNode)
  expect(renderer instanceof ImageRenderer).toBe(true)
})

test('maps list nodes to ListRenderer and item nodes to ListItemRenderer', () => {
  const listNode = getTestingNode('- item 1\n- item 2\n')
  const listRenderer = RendererSelector(listNode)
  expect(listRenderer instanceof ListRenderer).toBe(true)

  const listItemNode = listNode.firstChild
  const listItemRenderer = RendererSelector(listItemNode)
  expect(listItemRenderer instanceof ListItemRenderer).toBe(true)
})

test('maps unsupported nodes to NullRenderer', () => {
  const unsupportedNode = getTestingNode('<html/>')
  const renderer = RendererSelector(unsupportedNode)
  expect(renderer instanceof NullRenderer).toBe(true)
})
