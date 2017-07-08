import { Node } from 'commonmark';
import { createElement, ReactElement } from 'react';
import RenderOptions from '../RenderOptions';
import CommonMarkRenderer from './CommonMarkRenderer';

export default class ListRenderer extends CommonMarkRenderer {
  constructor(node: Node, options: RenderOptions | undefined) {
    super(node, options);
  }

  protected getDefaultProps(key: string): object {
    const defaultProps: any = super.getDefaultProps(key);
    const listStart = this.node.listStart;
    if (listStart != null && listStart !== 1) defaultProps.start = listStart;
    return defaultProps;
  }

  protected renderNodeWithProps(props: object): ReactElement<any> {
    const isBullet = this.node.listType.toLowerCase() === 'bullet';
    const listTag = isBullet ? 'ul' : 'ol';
    return createElement(listTag, props, []);
  }
}
