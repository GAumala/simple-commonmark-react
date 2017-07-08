import { Node } from 'commonmark';
import { createElement, ReactElement } from 'react';
import RenderOptions from '../RenderOptions';
import CommonMarkRenderer from './CommonMarkRenderer';

export default class LinkRenderer extends CommonMarkRenderer {
  constructor(node: Node, options: RenderOptions | undefined) {
    super(node, options);
  }

  protected getDefaultProps(key: string): object {
    const defaultProps: any = super.getDefaultProps(key);
    const title = this.node.title;
    if (title) defaultProps.title = title;
    defaultProps.href = this.node.destination;
    return defaultProps;
  }

  protected renderNodeWithProps(props: object): ReactElement<any> {
    return createElement('a', props, []);
  }
}
