import { ReactElement, createElement } from 'react'
import { Node } from 'commonmark'
import CommonMarkRenderer from './CommonMarkRenderer'

export default class CodeBlockRenderer extends CommonMarkRenderer {

  constructor (node: Node) {
    super(node)
  }

  private findLanguageName(): string | undefined {
    const codeInfo = this.node.info ? this.node.info.split(/ +/) : [];
    if (codeInfo.length > 0 && codeInfo[0].length > 0)
      return codeInfo[0]
  }

  private resolveClassName(customProps: any): string | undefined {
    const languageName = this.findLanguageName()
    const languageClass = languageName ? 'language-' + languageName +  ' ' : ''
    const className = languageClass + (customProps.className || '')
    if (className.length > 0)
      return className
  }

  private renderInnerCodeElement(props: object): ReactElement<any> {
    const codeText = this.node.literal
    return createElement('code', props, codeText)
  }

  renderNodeWithProps(props: object): ReactElement<any> {
    const className = this.resolveClassName(props)
    const codeChild = this.renderInnerCodeElement(props)
    return createElement('pre', { ...props, className }, codeChild)
  }
}
