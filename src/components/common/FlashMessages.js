
import React from 'react';
import Flash from '../../lib/Flash';

class FlashMessages extends React.Component {
  state = {
    messages: ''
  }

  componentWillUpdate() {
    const messages = Flash.getMessages();

    if(!messages) return false;

    this.setState({ messages });
    Flash.clearMessages();

    setTimeout(() => this.setState({ messages: '' }), 2000);
  }

  render() {
    return (
      <div className="container flashMessages">
        {this.state.messages && Object.keys(this.state.messages).map(type =>
          <div key={type} className={`notification is-${type}`}>{this.state.messages[type]}</div>
        )}
      </div>
    );
  }
}

export default FlashMessages;
