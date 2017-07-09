import React, { Component } from 'react';

import MarkdownEditor from './components/MarkdownEditor'
import MarkdownDisplay from './components/MarkdownDisplay'
import GoMarkGithub from 'react-icons/lib/go/mark-github'
import './App.css';

const defaultText = '[![npm version](https://badge.fury.io/js/simple-commonmark-react.svg)](https://badge.fury.io/js/simple-commonmark-react)' +
  '\n\n# Hello World!\n\n' +
  'Write something *here*, and it will be rendered as [markdown](http://www.markdowntutorial.com/) on the right.\n\n' +
  '**Try it out!**\nIf something is broken, please [submit an issue](https://github.com/GAumala/simple-commonmark-react/issues/new).\n\n'

class AppHeader extends Component {
  render() {
    return (
      <div className="App-header" style={{padding: '20px 16px 20px 16px'}}>
        <strong style={{fontSize: 26}}>Simple CommonMark React Demo</strong>
        <a href='https://github.com/GAumala/simple-commonmark-react' style={{float: 'right'}}>
          <GoMarkGithub size={36} color='white' />
        </a>
      </div>
    )
  }
}

class AppBody extends Component {
  state = {
    markdown: defaultText
  }

  onMarkdownChanged = (value) => {
    this.setState({ markdown: value })
  }

  render() {
    return (
      <div className="App-body">
        <MarkdownEditor onTextChanged={this.onMarkdownChanged} value={ this.state.markdown }/>
        <MarkdownDisplay  markdownText={ this.state.markdown }/>
      </div>
    )
  }
}


class App extends Component {

  render() {
    return (
      <div className="App">
        <AppHeader />
        <AppBody />
      </div>
    );
  }
}

export default App;
