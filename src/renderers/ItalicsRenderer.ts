import { Node } from 'commonmark';
import { createElement, ReactElement } from 'react';
import RenderOptions from '../RenderOptions';
import CommonMarkRenderer from './CommonMarkRenderer';

export default class ItalicsRenderer extends CommonMarkRenderer {
  constructor(node: Node, options: RenderOptions | undefined) {
    super(node, options);
  }

  protected renderNodeWithProps(props: object): ReactElement<any> {
    return createElement('em', props, []);
  }
}
