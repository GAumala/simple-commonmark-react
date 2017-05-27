import { ReactElement, createElement } from 'react'
import { Node } from 'commonmark'
import CommonMarkRenderer from './CommonMarkRenderer'

export default class HeaderRenderer extends CommonMarkRenderer {

  private elementName: string

  constructor (node: Node) {
    super(node)
    this.elementName = 'h' + node.level
  }

  renderNodeWithProps(props: object): ReactElement<any> {
    return createElement(this.elementName, props, [])
  }
}
