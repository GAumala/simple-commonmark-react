import { Node } from 'commonmark';

import RenderOptions from '../RenderOptions';
import BoldRenderer from './BoldRenderer';
import CodeBlockRenderer from './CodeBlockRenderer';
import CodeRenderer from './CodeRenderer';
import CommonMarkRenderer from './CommonMarkRenderer';
import HeaderRenderer from './HeaderRenderer';
import ImageRenderer from './ImageRenderer';
import ItalicsRenderer from './ItalicsRenderer';
import LineBreakRenderer from './LineBreakRenderer';
import LinkRenderer from './LinkRenderer';
import ListItemRenderer from './ListItemRenderer';
import ListRenderer from './ListRenderer';
import NullRenderer from './NullRenderer';
import ParagraphRenderer from './ParagraphRenderer';
import QuoteBlockRenderer from './QuoteBlockRenderer';
import TextRenderer from './TextRenderer';

const getCustomRenderer = (
  node: Node,
  options: RenderOptions | undefined,
):
  | (new (node: Node, options: RenderOptions | undefined) => CommonMarkRenderer)
  | undefined => {
  if (options) {
    const customRenderers = options.customRenderers;
    if (customRenderers) return customRenderers[node.type];
  }
};
const getRendererByNodeType = (
  node: Node,
  options: RenderOptions | undefined,
): CommonMarkRenderer => {
  const CustomRenderer = getCustomRenderer(node, options);
  if (CustomRenderer) return new CustomRenderer(node, options);

  switch (node.type) {
    case 'block_quote':
      return new QuoteBlockRenderer(node, options);
    case 'code':
      return new CodeRenderer(node, options);
    case 'code_block':
      return new CodeBlockRenderer(node, options);
    case 'document':
      return new NullRenderer(node, options);
    case 'emph':
      return new ItalicsRenderer(node, options);
    case 'heading':
      return new HeaderRenderer(node, options);
    case 'image':
      return new ImageRenderer(node, options);
    case 'item':
      return new ListItemRenderer(node, options);
    case 'link':
      return new LinkRenderer(node, options);
    case 'list':
      return new ListRenderer(node, options);
    case 'paragraph':
      return new ParagraphRenderer(node, options);
    case 'softbreak':
      return new LineBreakRenderer(node, options);
    case 'strong':
      return new BoldRenderer(node, options);
    case 'text':
      return new TextRenderer(node, options);
    default:
      console.error('Unsupported type: ' + node.type);
      return new NullRenderer(node, options);
  }
};

export default getRendererByNodeType;
