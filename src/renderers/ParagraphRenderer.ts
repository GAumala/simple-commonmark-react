import { ReactElement, createElement } from 'react'
import { Node } from 'commonmark'
import CommonMarkRenderer from './CommonMarkRenderer'

export default class ParagraphRenderer extends CommonMarkRenderer {

  constructor (node: Node) {
    super(node)
  }

  private isTightListChild(): boolean {
    const parent = this.node.parent
    return parent.type === 'item' && parent.listTight
  }

  renderNodeWithProps(props: object): ReactElement<any> | null {
    if (this.isTightListChild())
      // Don't create <p> tags in tight lists.
      // paragraph children should be append to the <li> element instead
      return null
    else
      return createElement('p', props, [])
  }
}
