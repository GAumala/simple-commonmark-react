import { Node } from 'commonmark'
import { ReactElement } from 'react'

import RenderOptions from '../RenderOptions'

export default abstract class CommonMarkRenderer {
  node: Node
  options: RenderOptions

  constructor(node: Node, options: RenderOptions | undefined) {
    this.node = node
    this.options = options || new RenderOptions()
  }

  getDefaultProps(key: string): object {
    const className = this.options.className
    return { className, key }
  }

  protected abstract renderNodeWithProps(props: object): ReactElement<any> | string | null

  renderNode(key: string): ReactElement<any> | string | null {
    const props = this.getDefaultProps(key)
    return this.renderNodeWithProps(props)
  }

}
