import { Node } from 'commonmark';
import { createElement, ReactElement } from 'react';
import RenderOptions from '../RenderOptions';
import CommonMarkRenderer from './CommonMarkRenderer';

export default class CodeBlockRenderer extends CommonMarkRenderer {
  constructor(node: Node, options: RenderOptions | undefined) {
    super(node, options);
  }

  protected renderNodeWithProps(props: object): ReactElement<any> {
    const className = this.resolveClassName();
    const codeChild = this.renderInnerCodeElement(props);
    return createElement('pre', { ...props, className }, codeChild);
  }

  private findLanguageName(): string | undefined {
    const codeInfo = this.node.info ? this.node.info.split(/ +/) : [];
    if (codeInfo.length > 0 && codeInfo[0].length > 0) return codeInfo[0];
  }

  private resolveClassName(): string | undefined {
    const languageName = this.findLanguageName();
    const languageClass = languageName ? 'language-' + languageName + ' ' : '';
    const className = languageClass + (this.options.className || '');
    if (className.length > 0) return className;
  }

  private renderInnerCodeElement(props: object): ReactElement<any> {
    const codeText = this.node.literal;
    return createElement('code', props, codeText);
  }
}
