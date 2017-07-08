import { Node } from 'commonmark';
import RenderOptions from '../RenderOptions';
import CommonMarkRenderer from './CommonMarkRenderer';

export default class CustomRendererDict {
  public block_quote:
    | (new (
        node: Node,
        options: RenderOptions | undefined,
      ) => CommonMarkRenderer)
    | undefined;
  public code_block:
    | (new (
        node: Node,
        options: RenderOptions | undefined,
      ) => CommonMarkRenderer)
    | undefined;
  public code:
    | (new (
        node: Node,
        options: RenderOptions | undefined,
      ) => CommonMarkRenderer)
    | undefined;
  public emph:
    | (new (
        node: Node,
        options: RenderOptions | undefined,
      ) => CommonMarkRenderer)
    | undefined;
  public heading:
    | (new (
        node: Node,
        options: RenderOptions | undefined,
      ) => CommonMarkRenderer)
    | undefined;
  public image:
    | (new (
        node: Node,
        options: RenderOptions | undefined,
      ) => CommonMarkRenderer)
    | undefined;
  public item:
    | (new (
        node: Node,
        options: RenderOptions | undefined,
      ) => CommonMarkRenderer)
    | undefined;
  public link:
    | (new (
        node: Node,
        options: RenderOptions | undefined,
      ) => CommonMarkRenderer)
    | undefined;
  public list:
    | (new (
        node: Node,
        options: RenderOptions | undefined,
      ) => CommonMarkRenderer)
    | undefined;
  public paragraph:
    | (new (
        node: Node,
        options: RenderOptions | undefined,
      ) => CommonMarkRenderer)
    | undefined;
  public softbreak:
    | (new (
        node: Node,
        options: RenderOptions | undefined,
      ) => CommonMarkRenderer)
    | undefined;
  public strong:
    | (new (
        node: Node,
        options: RenderOptions | undefined,
      ) => CommonMarkRenderer)
    | undefined;
  public text:
    | (new (
        node: Node,
        options: RenderOptions | undefined,
      ) => CommonMarkRenderer)
    | undefined;
}
