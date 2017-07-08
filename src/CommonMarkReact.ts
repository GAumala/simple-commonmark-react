import * as Commonmark from 'commonmark';
import { ReactElement } from 'react';

import ContainerStack from './ContainerStack';
import RendererSelector from './renderers/RendererSelector';
import RenderOptions from './RenderOptions';

const parser = new Commonmark.Parser();

const isValidReactElement = (
  element: string | ReactElement<any> | null,
): element is ReactElement<any> => {
  return element != null && (element as ReactElement<any>).props !== undefined;
};

const isValidContainer = (node: Commonmark.Node): boolean => {
  // while images are markdown containers, they are not react containers (can't have children)
  return node.isContainer && node.type !== 'image';
};

const insertNewElementToResult = (
  result: Array<ReactElement<any>>,
  stack: ContainerStack,
  newElement: string | ReactElement<any> | null,
) => {
  const currentContainer = stack.peekCurrentContainer();
  if (currentContainer && newElement !== null)
    currentContainer.props.children.push(newElement);
  else if (isValidReactElement(newElement)) result.push(newElement);
};

const updateContainerStack = (
  containerStack: ContainerStack,
  node: Commonmark.Node,
  newElement: string | ReactElement<any> | null,
) => {
  if (isValidContainer(node) && isValidReactElement(newElement))
    containerStack.pushContainer(node.type, newElement);
};

const computeUniqueKey = (
  result: Array<ReactElement<any>>,
  containerStack: ContainerStack,
): string => {
  const currentContainer = containerStack.peekCurrentContainer();
  if (currentContainer) return '' + currentContainer.props.children.length;
  return '' + result.length;
};

export const renderNodes = (
  source: string,
  options: RenderOptions | undefined,
): Array<ReactElement<any>> => {
  const result: Array<ReactElement<any>> = [];
  const nodesBlock = parser.parse(source);
  const walker = nodesBlock.walker();
  const containerStack = new ContainerStack();
  let event: Commonmark.NodeWalkingStep = walker.next();

  while (event) {
    const currentNode = event.node;
    if (event.entering) {
      const key = computeUniqueKey(result, containerStack);
      const renderer = RendererSelector(currentNode, options);
      const currentReactElement = renderer.renderNode(key);
      insertNewElementToResult(result, containerStack, currentReactElement);
      updateContainerStack(containerStack, currentNode, currentReactElement);
    } else if (currentNode.isContainer)
      containerStack.removeContainer(currentNode.type);
    event = walker.next();
  }
  return result;
};
