import { Node } from 'commonmark';
import { createElement, ReactElement } from 'react';
import RenderOptions from '../RenderOptions';
import CommonMarkRenderer from './CommonMarkRenderer';

export default class ParagraphRenderer extends CommonMarkRenderer {
  constructor(node: Node, options: RenderOptions | undefined) {
    super(node, options);
  }

  protected renderNodeWithProps(props: object): ReactElement<any> | null {
    if (this.isTightListChild())
      // Don't create <p> tags in tight lists.
      // paragraph children should be append to the <li> element instead
      return null;
    else return createElement('p', props, []);
  }

  private isTightListChild(): boolean {
    const parent = this.node.parent;
    return (parent && parent.type === 'item' && parent.listTight) || false;
  }
}
