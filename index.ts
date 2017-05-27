import { ReactElement } from 'react'
import * as Commonmark from 'commonmark'

import RendererSelector from './renderers/RendererSelector'
import ContainerStack from './ContainerStack'

const isValidReactElement = (element: string | ReactElement<any> | null):
  element is ReactElement<any> => {
    return element != null && (<ReactElement<any>>element).props !== undefined
}

const insertNewElementToResult = (result: ReactElement<any>[], stack: ContainerStack,
  newElement: string | ReactElement<any> | null) => {
    const currentContainer = stack.peekCurrentContainer()
      if (currentContainer && newElement !== null)
        currentContainer.props.children.push(newElement)
      else if (isValidReactElement(newElement)) {
        result.push(newElement)
      }
  }

const updateContainerStack = (containerStack: ContainerStack, node: Commonmark.Node,
    newElement: string | ReactElement<any> | null) => {
  if (node.isContainer && isValidReactElement(newElement))
    containerStack.pushContainer(node.type, newElement)
}

const computeUniqueKey = (result: ReactElement<any>[], containerStack: ContainerStack)
    : string => {
  const currentContainer = containerStack.peekCurrentContainer()
  if (currentContainer)
    return "" + currentContainer.props.children.length
  return "" + result.length
}

const renderNodes = (nodesBlock: Commonmark.Node, customProps: object):
  ReactElement<any>[] => {
  const result: ReactElement<any>[] = []

  const walker = nodesBlock.walker()
  const containerStack = new ContainerStack()
  let event: Commonmark.NodeWalkingStep

  while (event = walker.next()) {
    const currentNode = event.node
    const key = computeUniqueKey(result, containerStack)
    if (event.entering) {
      const renderer = RendererSelector(currentNode)
      const currentReactElement = renderer.renderNode(customProps, key)
      insertNewElementToResult(result, containerStack, currentReactElement)
      updateContainerStack(containerStack, currentNode, currentReactElement)
    } else {
      if (currentNode.isContainer)
        containerStack.removeContainer(currentNode.type)
    }
  }
  return result
}

export default renderNodes
