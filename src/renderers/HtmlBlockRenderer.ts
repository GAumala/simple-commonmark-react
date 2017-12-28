import { Node } from 'commonmark';
import { createElement, ReactElement } from 'react';
import RenderOptions from '../RenderOptions';
import CommonMarkRenderer from './CommonMarkRenderer';

export default class HtmlBlockRenderer extends CommonMarkRenderer {
  constructor(node: Node, options: RenderOptions | undefined) {
    super(node, options);
  }

  protected getDefaultProps(key: string): object {
    const dangerouslySetInnerHTML = { __html: this.node.literal };
    return { ...super.getDefaultProps(key), dangerouslySetInnerHTML };
  }
  protected renderNodeWithProps(props: object): ReactElement<any> | string {
    return createElement('div', props);
  }
}
