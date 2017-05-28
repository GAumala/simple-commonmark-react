import { ReactElement, createElement } from 'react'
import { Node } from 'commonmark'
import CommonMarkRenderer from './CommonMarkRenderer'
import RenderOptions from '../RenderOptions'

export default class ItalicsRenderer extends CommonMarkRenderer {

  constructor (node: Node, options: RenderOptions | undefined) {
    super(node, options)
  }

  renderNodeWithProps(props: object): ReactElement<any> {
    return createElement('em', props, [])
  }
}
