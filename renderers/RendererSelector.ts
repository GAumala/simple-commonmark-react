import * as Commonmark from 'commonmark'

import CommonMarkRenderer from './CommonMarkRenderer'
import TextRenderer from './TextRenderer'
import ParagraphRenderer from './ParagraphRenderer'
import HeaderRenderer from './HeaderRenderer'
import DocumentRenderer from './DocumentRenderer'

const getRendererByNodeType = (node: Commonmark.Node): CommonMarkRenderer => {
  switch (node.type) {
    case 'text':
      return new TextRenderer(node)
    case 'paragraph':
      return new ParagraphRenderer(node)
    case 'heading':
      return new HeaderRenderer(node)
    case 'document':
      return new DocumentRenderer(node)
    default:
      throw Error('Unsupported type: ' + node.type)
  }
}

export default getRendererByNodeType
