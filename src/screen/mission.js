import React from 'react';
import '../style.css';

export default class Mission extends React.Component {
  state = {
    toggle: false,
    list: [
      { des: 'Đăng nhập mỗi ngày', value: 1, isComplete: true },
      { des: 'Quy đổi 10.000 điểm thưởng', value: 1, isComplete: false },
      { des: 'Chia sẽ ứng dụng với bạn bè', value: 1, isComplete: false },
      {
        des: 'Mỗi giao dịch thành công qua thẻ Vietinbank',
        value: 1,
        max: 3,
        isComplete: false,
      },
    ],
  };

  toggle() {
    this.setState({
      toggle: !this.state.toggle,
    });

    this.reset();
  }

  reset() {
    this.state.list[0].isComplete = true;
    this.setState({});
  }

  onClick(item) {
    if (item.isComplete) this.props.onClick && this.props.onClick(item.value);
    item.isComplete = false;
    // console.log('click item', item);
  }

  render() {
    return (
      this.state.toggle && (
        <div className="popup mission modal">
          <div className="content">
            <div className="header row">
              <span className="title">Nhiệm vụ</span>
              <div style={{ cursor: 'pointer' }} onClick={() => this.toggle()}>
                <img
                  src="https://img.icons8.com/material-sharp/344/delete-sign.png"
                  width={24}
                  height={24}
                />
              </div>
            </div>
            <div className="list">
              {this.state.list.map((item, index) => (
                <div key={index} className="row" style={{ margin: '8px' }}>
                  <span>{item.des}</span>
                  <div
                    className={
                      'button ' +
                      (item.isComplete
                        ? 'bt-item-mission'
                        : 'bt-item-mission-disable')
                    }
                    onClick={() => this.onClick(item)}
                  >
                    <span className="button-text">Nhận</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    );
  }
}
