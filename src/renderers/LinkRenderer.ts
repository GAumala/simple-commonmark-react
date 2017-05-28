import { ReactElement, createElement } from 'react'
import { Node } from 'commonmark'
import CommonMarkRenderer from './CommonMarkRenderer'

export default class LinkRenderer extends CommonMarkRenderer {

  constructor (node: Node) {
    super(node)
  }

  mergeCustomPropsWithDefaultProps(customProps: any, key: string): object {
    const mergedProps: any = super.mergeCustomPropsWithDefaultProps(customProps, key)
    mergedProps.title = this.node.title
    mergedProps.href = this.node.destination
    return mergedProps
  }

  renderNodeWithProps(props: object): ReactElement<any> {
    return createElement('a', props, [])
  }
}
