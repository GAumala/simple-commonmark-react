import { ReactElement, createElement } from 'react'
import { Node } from 'commonmark'
import CommonMarkRenderer from './CommonMarkRenderer'
import RenderOptions from '../RenderOptions'

export default class LinkRenderer extends CommonMarkRenderer {

  constructor (node: Node, options: RenderOptions | undefined) {
    super(node, options)
  }

  getDefaultProps(key: string): object {
    const defaultProps: any = super.getDefaultProps(key)
    const title = this.node.title
    if (title)
      defaultProps.title = title
    defaultProps.href = this.node.destination
    return defaultProps
  }

  renderNodeWithProps(props: object): ReactElement<any> {
    return createElement('a', props, [])
  }
}
