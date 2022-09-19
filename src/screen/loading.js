import React from 'react';
import './style.css';

export default class LoadingScreen extends React.Component {
  state = {
    progress: 0,
    isLoading: false,
  };

  onStartPrgress() {
    var value = 0.0;
    isLoading = true;

    this.timer = setInterval(() => {
      value += 0.01;
      value = parseFloat(value.toFixed(2));
      this.setState({
        progress: value,
      });
      if (this.state.progress >= 0.95) {
        clearInterval(this.timer);
        this.setState({
          progress: 1,
          isLoading: false,
        });
        return;
      }
      // console.log('processing', value);
    }, 50);
  }

  render() {
    let maxWidth = this.props.maxWidth || 300;

    return (
      <div className="popup p-loading">
        <div className="content loading" style={{ width: maxWidth }}>
          <div className="row">
            <div style={{ padding: '4px 2px' }}>
              <span> Đang tải khởi tạo </span>
            </div>
            <span>{this.state.progress * 100}%</span>
          </div>
          <div className="progress">
            <div
              className="background"
              style={{ width: maxWidth, height: '10px' }}
            />
            <div
              className="foreground"
              style={{
                maxWidth: maxWidth,
                width: (this.state.progress * maxWidth) / 1,
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}
