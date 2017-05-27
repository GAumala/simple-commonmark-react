import { Node } from 'commonmark'
import { ReactElement } from 'react'

export default abstract class CommonMarkRenderer {
  node: Node

  constructor(node: Node) {
    this.node = node
  }

  mergeCustomPropsWithDefaultProps(customProps: any, key: string): object {
    return { ...customProps, key }
  }

  protected abstract renderNodeWithProps(props: object): ReactElement<any> | string | null

  renderNode(customProps: any, key: string): ReactElement<any> | string | null {
    const props = this.mergeCustomPropsWithDefaultProps(customProps, key)
    return this.renderNodeWithProps(props)
  }

}
