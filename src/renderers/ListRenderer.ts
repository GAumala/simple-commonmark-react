import { ReactElement, createElement } from 'react'
import { Node } from 'commonmark'
import CommonMarkRenderer from './CommonMarkRenderer'

export default class ListRenderer extends CommonMarkRenderer {

  constructor (node: Node) {
    super(node)
  }

  mergeCustomPropsWithDefaultProps(customProps: any, key: string): object {
    const mergedProps: any = super.mergeCustomPropsWithDefaultProps(customProps, key)
    const listStart = this.node.listStart
    if (listStart != null && listStart !== 1)
      mergedProps.start = listStart
    return mergedProps

  }

  renderNodeWithProps(props: object): ReactElement<any> {
    const isBullet = this.node.listType.toLowerCase() === 'bullet'
    const listTag = isBullet ? 'ul' : 'ol'
    return createElement(listTag, props, [])
  }
}
