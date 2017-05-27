import { ReactElement, createElement } from 'react'
import { Node } from 'commonmark'
import CommonMarkRenderer from './CommonMarkRenderer'

export default class DocumentRenderer extends CommonMarkRenderer {

  constructor (node: Node) {
    super(node)
  }

  renderNodeWithProps(props: object):  null {
    return null //ignore this type of node
  }
}
