import { ReactElement, createElement } from 'react'
import { Node } from 'commonmark'
import CommonMarkRenderer from './CommonMarkRenderer'
import RenderOptions from '../RenderOptions'

export default class ListRenderer extends CommonMarkRenderer {

  constructor (node: Node, options: RenderOptions | undefined) {
    super(node, options)
  }

  getDefaultProps(key: string): object {
    const defaultProps: any = super.getDefaultProps(key)
    const listStart = this.node.listStart
    if (listStart != null && listStart !== 1)
      defaultProps.start = listStart
    return defaultProps

  }

  renderNodeWithProps(props: object): ReactElement<any> {
    const isBullet = this.node.listType.toLowerCase() === 'bullet'
    const listTag = isBullet ? 'ul' : 'ol'
    return createElement(listTag, props, [])
  }
}
