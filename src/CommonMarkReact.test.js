import React from 'react';
import renderer from 'react-test-renderer';

const { renderNodes } = require('./CommonMarkReact.ts');

const renderToJSON = (markdown, options) => {
  const mergeOptions = Object.assign({ className: 'markdown' }, options);
  const nodes = renderNodes(markdown, mergeOptions);
  const rootElement = React.createElement('div', null, nodes);
  const component = renderer.create(rootElement);
  return component.toJSON();
};

test('Renders markdown tags: header and paragraph with custom class names', () => {
  const markdown = '## Title\n\nHello World!\n';
  const tree = renderToJSON(markdown);
  expect(tree).toMatchSnapshot();
});

test('Renders inline markdown tags: bold, code, softbreak and emph with custom class names', () => {
  const markdown =
    'Hello World!\n*this* is italics, **this** is bold and `this` is code';
  const tree = renderToJSON(markdown);
  expect(tree).toMatchSnapshot();
});

test('Renders line breaks as <br/> if allowSoftBreaks option is active', () => {
  const markdown =
    'Hello World!\n*this* is italics, **this** is bold and `this` is code';
  const tree = renderToJSON(markdown, { allowSoftBreaks: true });
  expect(tree).toMatchSnapshot();
});

test('Renders markdown tags: header, paragraph and code_block with custom class names', () => {
  const markdown =
    '# Code Test\n\n Check this code\n\n```c\n\n#include <stdio.h>\n```';
  const tree = renderToJSON(markdown);
  expect(tree).toMatchSnapshot();
});

test('Renders code_block without language name with custom class names', () => {
  const markdown =
    '# Code Test\n\n Check this code\n\n```\nSome pseudo code\n```';
  const tree = renderToJSON(markdown);
  expect(tree).toMatchSnapshot();
});

test('Renders markdown link with custom class names', () => {
  const markdown =
    'Check out this [link](https://fsf.org) and [this one](/local/path "some server url") with title';
  const tree = renderToJSON(markdown);
  expect(tree).toMatchSnapshot();
});

test('Renders markdown images with custom class names', () => {
  const markdown =
    'Check out this ![image](https://somewebsite.org/pic.png) it is inline\n\nAlso this one:\n\n![local pic](/public/photo.png "my pic")';
  const tree = renderToJSON(markdown);
  expect(tree).toMatchSnapshot();
});

test('Renders markdown block quote with bold and italics', () => {
  const markdown = '> This is some quote with **bold** and *italics*.';
  const tree = renderToJSON(markdown);
  expect(tree).toMatchSnapshot();
});

test('Renders bullet lists with custom class names', () => {
  const markdown =
    '- item with [link](https://eff.org)\n- item with `code`\n- item with **bold**\n- item with *emph*\n';
  const tree = renderToJSON(markdown);
  expect(tree).toMatchSnapshot();
});

test('Renders ordered lists with custom class names', () => {
  const markdown =
    '1) item with [link](https://eff.org)\n2) item with `code`\n3) item with **bold**\n4) item with *emph*\n';
  const tree = renderToJSON(markdown);
  expect(tree).toMatchSnapshot();
});

test('Renders ordered lists starting from arbitrary index with custom class names', () => {
  const markdown = '4) item with **bold**\n5) item with `code`\n';
  const tree = renderToJSON(markdown);
  expect(tree).toMatchSnapshot();
});

test('Renders loose lists with custom class names', () => {
  const markdown =
    '- item with [link](https://eff.org)\n\n- item with *emph*\n\n';
  const tree = renderToJSON(markdown);
  expect(tree).toMatchSnapshot();
});

test('Renders correctly when customProps is undefined', () => {
  const markdown =
    '# Code Test\n\n Check this code\n\n```c\n\n#include <stdio.h>\n```';
  const nodes = renderNodes(markdown);
  const rootElement = React.createElement('div', null, nodes);
  const component = renderer.create(rootElement);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
