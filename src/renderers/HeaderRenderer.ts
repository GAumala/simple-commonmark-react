import { ReactElement, createElement } from 'react'
import { Node } from 'commonmark'
import CommonMarkRenderer from './CommonMarkRenderer'
import RenderOptions from '../RenderOptions'

export default class HeaderRenderer extends CommonMarkRenderer {

  constructor (node: Node, options: RenderOptions | undefined) {
    super(node, options)
  }
  
  renderNodeWithProps(props: object): ReactElement<any> {
    const elementName = 'h' + this.node.level
    return createElement(elementName, props, [])
  }
}
