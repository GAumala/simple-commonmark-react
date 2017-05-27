import { ReactElement, createElement } from 'react'
import { Node } from 'commonmark'
import CommonMarkRenderer from './CommonMarkRenderer'

export default class CodeRenderer extends CommonMarkRenderer {

  constructor (node: Node) {
    super(node)
  }

  renderNodeWithProps(props: object): ReactElement<any> {
    const codeText = this.node.literal
    return createElement('code', props, [codeText])
  }
}
