import * as Commonmark from 'commonmark'

import RenderOptions from '../RenderOptions'
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

const getRendererByNodeType = (node: Commonmark.Node, options: RenderOptions | undefined):
  CommonMarkRenderer => {
  switch (node.type) {
    case 'code':
      return new CodeRenderer(node, options)
    case 'code_block':
      return new CodeBlockRenderer(node, options)
    case 'document':
      return new DocumentRenderer(node, options)
    case 'emph':
      return new ItalicsRenderer(node, options)
    case 'heading':
      return new HeaderRenderer(node, options)
    case 'image':
      return new ImageRenderer(node, options)
    case 'item':
      return new ListItemRenderer(node, options)
    case 'link':
      return new LinkRenderer(node, options)
    case 'list':
      return new ListRenderer(node, options)
    case 'paragraph':
      return new ParagraphRenderer(node, options)
    case 'softbreak':
      return new LineBreakRenderer(node, options)
    case 'strong':
      return new BoldRenderer(node, options)
    case 'text':
      return new TextRenderer(node, options)
    default:
      throw Error('Unsupported type: ' + node.type)
  }
}

export default getRendererByNodeType
