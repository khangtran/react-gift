import React from 'react';
import '../style.css';
import PopupModal from '../widgets/popupModal';

export default class RuleScreen extends React.Component {
  state = {
    list: [],
  };

  toggle() {
    this.modal.toggle();
  }

  render() {
    return (
      <PopupModal
        ref={(c) => (this.modal = c)}
        className="rule"
        title="Thể lệ"
        content={
          <div>
            {this.state.list.map((item, index) => (
              <div>{item}</div>
            ))}
          </div>
        }
      />
    );
  }
}
