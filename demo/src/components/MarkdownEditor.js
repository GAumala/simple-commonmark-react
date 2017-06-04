import React, { Component } from 'react';

const style = {
  height: '100%',
  width: '100%',
  padding: '16px',
  boxSizing: 'border-box',
  fontSize: '18px',
}

export default class MarkdownEditor extends Component {


  render() {

    const {
      value,
      onTextChanged,
    } = this.props

    return (
      <div >
        <textarea
          ref={ (textAreaRef) => this.textAreaRef = textAreaRef }
          onInput={ () => onTextChanged(this.textAreaRef.value) }
          style={ style }
          value={ value } />
      </div>
    )
  }
}
