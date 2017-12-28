import React from 'react';
import renderer from 'react-test-renderer';

import { renderNodes } from './CommonMarkReact.ts';

const renderToJSON = (markdown, rendererKey, customRenderer) => {
  const options = { customRenderers: {} };
  options.customRenderers[rendererKey] = customRenderer;
  const nodes = renderNodes(markdown, options);
  const rootElement = React.createElement('div', null, nodes);
  const component = renderer.create(rootElement);
  return component.toJSON();
};

function GenericRenderer(className) {
  return function() {
    return {
      renderNode: function(key) {
        return React.createElement('div', { key, className }, []);
      },
    };
  };
}

test('Renders custom bold', () => {
  const customRenderer = GenericRenderer('bold');
  const markdown = '**hello world**\n';
  const tree = renderToJSON(markdown, 'strong', customRenderer);
  expect(tree).toMatchSnapshot();
});

test('Renders custom code block', () => {
  const customRenderer = GenericRenderer('code-block');
  const markdown = '```\nhello world\n```';
  const tree = renderToJSON(markdown, 'code_block', customRenderer);
  expect(tree).toMatchSnapshot();
});

test('Renders custom inline code', () => {
  const customRenderer = GenericRenderer('code');
  const markdown = '`hello world`';
  const tree = renderToJSON(markdown, 'code', customRenderer);
  expect(tree).toMatchSnapshot();
});

test('Renders custom header', () => {
  const customRenderer = GenericRenderer('header');
  const markdown = '# hello world';
  const tree = renderToJSON(markdown, 'heading', customRenderer);
  expect(tree).toMatchSnapshot();
});

test('Renders custom image', () => {
  const customRenderer = GenericRenderer('image');
  const markdown = '![hello world](/pic.png)';
  const tree = renderToJSON(markdown, 'image', customRenderer);
  expect(tree).toMatchSnapshot();
});

test('Renders custom italics', () => {
  const customRenderer = GenericRenderer('italics');
  const markdown = '*hello world*\n';
  const tree = renderToJSON(markdown, 'emph', customRenderer);
  expect(tree).toMatchSnapshot();
});

test('Renders custom linebreak', () => {
  const customRenderer = GenericRenderer('line-break');
  const markdown = 'hello\nworld';
  const tree = renderToJSON(markdown, 'softbreak', customRenderer);
  expect(tree).toMatchSnapshot();
});

test('Renders custom link', () => {
  const customRenderer = GenericRenderer('link');
  const markdown = '[hello world](/home)';
  const tree = renderToJSON(markdown, 'link', customRenderer);
  expect(tree).toMatchSnapshot();
});

test('Renders custom list', () => {
  const customRenderer = GenericRenderer('list');
  const markdown = '- hello world\n';
  const tree = renderToJSON(markdown, 'list', customRenderer);
  expect(tree).toMatchSnapshot();
});

test('Renders custom list item', () => {
  const customRenderer = GenericRenderer('list-item');
  const markdown = '- hello world\n';
  const tree = renderToJSON(markdown, 'item', customRenderer);
  expect(tree).toMatchSnapshot();
});

test('Renders custom paragraph', () => {
  const customRenderer = GenericRenderer('paragraph');
  const markdown = 'hello world\n';
  const tree = renderToJSON(markdown, 'paragraph', customRenderer);
  expect(tree).toMatchSnapshot();
});

test('Renders custom block quote', () => {
  const customRenderer = GenericRenderer('block_quote');
  const markdown = '> hello world\n';
  const tree = renderToJSON(markdown, 'block_quote', customRenderer);
  expect(tree).toMatchSnapshot();
});

test('Renders custom text', () => {
  const customRenderer = GenericRenderer('text');
  const markdown = 'hello world\n';
  const tree = renderToJSON(markdown, 'text', customRenderer);
  expect(tree).toMatchSnapshot();
});

test('Renders custom thematic break', () => {
  const customRenderer = GenericRenderer('thematic_break');
  const markdown = '***';
  const tree = renderToJSON(markdown, 'thematic_break', customRenderer);
  expect(tree).toMatchSnapshot();
});
