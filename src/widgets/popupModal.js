import React from 'react';
import '../style.css';

export default class PopupModal extends React.Component {
  state = {
    isToggle: false,
  };

  toggle() {
    this.setState({
      isToggle: !this.state.isToggle,
    });
  }

  render() {
    return (
      this.state.isToggle && (
        <div className={'popup ' + this.props.className || ''}>
          <div className="header row">
            <span className="title">{this.props.title}</span>
            <div style={{ cursor: 'pointer' }} onClick={() => this.toggle()}>
              <img
                src="https://img.icons8.com/material-sharp/344/delete-sign.png"
                width={24}
                height={24}
              />
            </div>
          </div>
          <div className="content">{this.props.content}</div>
        </div>
      )
    );
  }
}
