import React from 'react'
import { renderNodes } from 'simple-commonmark-react'

const style = {
  width: '100%',
  boxSizing: 'border-box',
}
export default class MarkdownDisplay extends React.Component {
  render() {
    const source = this.props.markdownText
    return (
      <div>
        <div style={style}>
        { renderNodes(source) }
        </div>
      </div>
    )
  }
}
