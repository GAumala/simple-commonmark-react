import { Node } from 'commonmark'
import { ReactElement } from 'react'

export default abstract class CommonMarkRenderer {
  node: Node

  constructor(node: Node) {
    this.node = node
  }

  mergeCustomPropsWithDefaultProps(customProps: object): object {
    return customProps
  }

  protected abstract renderNodeWithProps(props: object): ReactElement<any> | string | null

  renderNode(customProps: object): ReactElement<any> | string | null {
    const props = this.mergeCustomPropsWithDefaultProps(customProps)
    return this.renderNodeWithProps(props)
  }

}
