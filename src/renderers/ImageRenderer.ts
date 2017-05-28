import { ReactElement, createElement } from 'react'
import { Node } from 'commonmark'
import CommonMarkRenderer from './CommonMarkRenderer'
import RenderOptions from '../RenderOptions'

export default class ImageRenderer extends CommonMarkRenderer {

  constructor (node: Node, options: RenderOptions | undefined) {
    super(node, options)
  }

  private clearAltTextNode(node: any) {
    //dirty side effect, text node has to be cleared because img react elements can't have childrem
    node.literal = null
  }

  private findAltText(): string | undefined {
    const textNode = this.node.firstChild
    if (textNode) {
      const altText = textNode.literal
      this.clearAltTextNode(textNode)
      return altText
    }
  }

  getDefaultProps(key: string): object {
    const defaultProps: any = super.getDefaultProps(key)
    const title = this.node.title
    if (title)
      defaultProps.title = title
    defaultProps.alt = this.findAltText()
    defaultProps.src = this.node.destination
    return defaultProps
  }


  renderNodeWithProps(props: object): ReactElement<any> {
    return createElement('img', props)
  }
}
