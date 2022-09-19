import React from 'react';
import '../style.css';
import PopupModal from './popupModal';

export default class DialogModal extends React.Component {
  state = {
    message: '',
    actions: [],
  };

  showMessage(msg, actions) {
    this.setState({
      message: msg,
      actions: actions,
    });

    this.modal.toggle();
  }

  pop() {
    this.modal.toggle();
  }

  render() {
    return (
      <PopupModal
        className="message"
        ref={(c) => (this.modal = c)}
        title=""
        content={
          <>
            <div>
              <span>{this.state.message}</span>
            </div>

            <div className="row">
              {this.state.actions.map((item, index) => (
                <div
                  key={index}
                  className="button bt-normal"
                  onClick={() => item.onPress && item.onPress()}
                >
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </>
        }
      />
    );
  }
}
