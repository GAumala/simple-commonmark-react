import { Node } from 'commonmark';
import RenderOptions from '../RenderOptions';
import CommonMarkRenderer from './CommonMarkRenderer';

export type RendererFactory = (new (
  node: Node,
  options: RenderOptions | undefined,
) => CommonMarkRenderer);

export default class CustomRendererDict {
  public block_quote?: RendererFactory;
  public code?: RendererFactory;
  public code_block?: RendererFactory;
  public document?: RendererFactory;
  public emph?: RendererFactory;
  public heading?: RendererFactory;
  public html?: RendererFactory;
  public html_block?: RendererFactory;
  public image?: RendererFactory;
  public item?: RendererFactory;
  public link?: RendererFactory;
  public list?: RendererFactory;
  public paragraph?: RendererFactory;
  public softbreak?: RendererFactory;
  public strong?: RendererFactory;
  public text?: RendererFactory;
  public hardbreak?: RendererFactory;
  public thematic_break?: RendererFactory;
}
