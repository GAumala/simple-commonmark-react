import CommonMarkRenderer from './CommonMarkRenderer'
import RenderOptions from '../RenderOptions'
import { Node } from 'commonmark'


export default class CustomRendererDict {
  code_block: (new (node: Node, options: RenderOptions | undefined) => CommonMarkRenderer) | undefined
  code: (new (node: Node, options: RenderOptions | undefined) => CommonMarkRenderer) | undefined
  emph: (new (node: Node, options: RenderOptions | undefined) => CommonMarkRenderer) | undefined
  heading: (new (node: Node, options: RenderOptions | undefined) => CommonMarkRenderer) | undefined
  image: (new (node: Node, options: RenderOptions | undefined) => CommonMarkRenderer) | undefined
  item: (new (node: Node, options: RenderOptions | undefined) => CommonMarkRenderer) | undefined
  link: (new (node: Node, options: RenderOptions | undefined) => CommonMarkRenderer) | undefined
  list: (new (node: Node, options: RenderOptions | undefined) => CommonMarkRenderer) | undefined
  paragraph: (new (node: Node, options: RenderOptions | undefined) => CommonMarkRenderer) | undefined
  softbreak: (new (node: Node, options: RenderOptions | undefined) => CommonMarkRenderer) | undefined
  strong: (new (node: Node, options: RenderOptions | undefined) => CommonMarkRenderer) | undefined
  text: (new (node: Node, options: RenderOptions | undefined) => CommonMarkRenderer) | undefined

  constructor() {
  }

}
