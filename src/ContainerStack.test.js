import React from 'react';
import ContainerStack from './ContainerStack.ts';

const removeAndPeek = (stack, removedType, expectedPeekedContainer) => {
  stack.removeContainer(removedType);
  const peekedContainer = stack.peekCurrentContainer();
  expect(peekedContainer).toBe(expectedPeekedContainer);
};

test('can push containers and then peek them', () => {
  const stack = new ContainerStack();
  const elem = React.createElement('p', null, null);
  stack.pushContainer('p', elem);
  const peekedContainer = stack.peekCurrentContainer();
  expect(peekedContainer).toBe(elem);
});

test("does not remove container if types don't match", () => {
  const stack = new ContainerStack();
  const elem = React.createElement('p', null, null);
  stack.pushContainer('p', elem);
  const peekedContainer = stack.peekCurrentContainer();
  stack.removeContainer('pre');
  expect(peekedContainer).toBe(elem);
});

test('removeContainer changes the value of peekCurrentContainer to always return the latest container', () => {
  const stack = new ContainerStack();
  const elem1 = React.createElement('p', null, null);
  const elem2 = React.createElement('strong', null, null);
  const elem3 = React.createElement('code', null, null);

  stack.pushContainer('p', elem1);
  stack.pushContainer('strong', elem2);
  stack.pushContainer('code', elem3);

  let peekedContainer = stack.peekCurrentContainer();
  expect(peekedContainer).toBe(elem3);

  removeAndPeek(stack, 'code', elem2);
  removeAndPeek(stack, 'strong', elem1);
  removeAndPeek(stack, 'p', undefined);
});
