import { ReactElement, createElement } from 'react'
import { Node } from 'commonmark'
import CommonMarkRenderer from './CommonMarkRenderer'
import RenderOptions from '../RenderOptions'

export default class CodeBlockRenderer extends CommonMarkRenderer {

  constructor (node: Node, options: RenderOptions | undefined) {
    super(node, options)
  }

  private findLanguageName(): string | undefined {
    const codeInfo = this.node.info ? this.node.info.split(/ +/) : [];
    if (codeInfo.length > 0 && codeInfo[0].length > 0)
      return codeInfo[0]
  }

  private resolveClassName(): string | undefined {
    const languageName = this.findLanguageName()
    const languageClass = languageName ? 'language-' + languageName +  ' ' : ''
    const className = languageClass + (this.options.className || '')
    if (className.length > 0)
      return className
  }

  private renderInnerCodeElement(props: object): ReactElement<any> {
    const codeText = this.node.literal
    return createElement('code', props, codeText)
  }

  renderNodeWithProps(props: object): ReactElement<any> {
    const className = this.resolveClassName()
    const codeChild = this.renderInnerCodeElement(props)
    return createElement('pre', { ...props, className }, codeChild)
  }
}
