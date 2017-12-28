import { Node } from 'commonmark';
import { createElement, ReactElement } from 'react';
import RenderOptions from '../RenderOptions';
import CommonMarkRenderer from './CommonMarkRenderer';

export default class HtmlBlockRenderer extends CommonMarkRenderer {
  constructor(node: Node, options: RenderOptions | undefined) {
    super(node, options);
  }

  protected getDefaultProps(key: string): object {
    return { dangerouslySetInnerHtml: this.node.text, key };
  }
  protected renderNodeWithProps(props: object): ReactElement<any> | string {
    return createElement('div', props);
  }
}
