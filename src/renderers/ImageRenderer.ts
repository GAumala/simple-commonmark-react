import { ReactElement, createElement } from 'react'
import { Node } from 'commonmark'
import CommonMarkRenderer from './CommonMarkRenderer'

export default class ImageRenderer extends CommonMarkRenderer {

  constructor (node: Node) {
    super(node)
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

  mergeCustomPropsWithDefaultProps(customProps: any, key: string): object {
    const mergedProps: any = super.mergeCustomPropsWithDefaultProps(customProps, key)
    const title = this.node.title
    if (title)
      mergedProps.title = title
    mergedProps.alt = this.findAltText()
    mergedProps.src = this.node.destination
    return mergedProps
  }


  renderNodeWithProps(props: object): ReactElement<any> {
    return createElement('img', props)
  }
}
