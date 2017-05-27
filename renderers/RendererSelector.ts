import * as Commonmark from 'commonmark'

import CommonMarkRenderer from './CommonMarkRenderer'
import BoldRenderer from './BoldRenderer'
import DocumentRenderer from './DocumentRenderer'
import ItalicsRenderer from './ItalicsRenderer'
import HeaderRenderer from './HeaderRenderer'
import ParagraphRenderer from './ParagraphRenderer'
import TextRenderer from './TextRenderer'

const getRendererByNodeType = (node: Commonmark.Node): CommonMarkRenderer => {
  switch (node.type) {
    case 'document':
      return new DocumentRenderer(node)
    case 'emph':
      return new ItalicsRenderer(node)
    case 'heading':
      return new HeaderRenderer(node)
    case 'paragraph':
      return new ParagraphRenderer(node)
    case 'strong':
      return new BoldRenderer(node)
    case 'text':
      return new TextRenderer(node)
    default:
      throw Error('Unsupported type: ' + node.type)
  }
}

export default getRendererByNodeType
