import { ReactElement, createElement } from 'react'
import { Node } from 'commonmark'
import CommonMarkRenderer from './CommonMarkRenderer'

export default class TextRenderer extends CommonMarkRenderer {

  constructor (node: Node) {
    super(node)
  }

  renderNodeWithProps(props: object): string {
    return this.node.literal
  }
}
