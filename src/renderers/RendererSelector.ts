import * as Commonmark from 'commonmark'

import CommonMarkRenderer from './CommonMarkRenderer'
import BoldRenderer from './BoldRenderer'
import CodeRenderer from './CodeRenderer'
import CodeBlockRenderer from './CodeBlockRenderer'
import DocumentRenderer from './DocumentRenderer'
import HeaderRenderer from './HeaderRenderer'
import ImageRenderer from './ImageRenderer'
import ItalicsRenderer from './ItalicsRenderer'
import LineBreakRenderer from './LineBreakRenderer'
import LinkRenderer from './LinkRenderer'
import ListItemRenderer from './ListItemRenderer'
import ListRenderer from './ListRenderer'
import ParagraphRenderer from './ParagraphRenderer'
import TextRenderer from './TextRenderer'

const getRendererByNodeType = (node: Commonmark.Node): CommonMarkRenderer => {
  switch (node.type) {
    case 'code':
      return new CodeRenderer(node)
    case 'code_block':
      return new CodeBlockRenderer(node)
    case 'document':
      return new DocumentRenderer(node)
    case 'emph':
      return new ItalicsRenderer(node)
    case 'heading':
      return new HeaderRenderer(node)
    case 'image':
      return new ImageRenderer(node)
    case 'item':
      return new ListItemRenderer(node)
    case 'link':
      return new LinkRenderer(node)
    case 'list':
      return new ListRenderer(node)
    case 'paragraph':
      return new ParagraphRenderer(node)
    case 'softbreak':
      return new LineBreakRenderer(node)
    case 'strong':
      return new BoldRenderer(node)
    case 'text':
      return new TextRenderer(node)
    default:
      throw Error('Unsupported type: ' + node.type)
  }
}

export default getRendererByNodeType
