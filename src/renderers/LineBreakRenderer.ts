import { ReactElement, createElement } from 'react'
import { Node } from 'commonmark'
import CommonMarkRenderer from './CommonMarkRenderer'

export default class LineBreakRenderer extends CommonMarkRenderer {

  constructor (node: Node) {
    super(node)
  }

  renderNodeWithProps(props: object): ReactElement<any> {
    return createElement('br')
  }
}
