import React from 'react';
import '../style.css';

export default class LoadingScreen extends React.Component {
  state = {
    progress: 0,
    isToggle: false,
  };

  timer = null;

  toggle() {
    this.setState(
      {
        isToggle: !this.state.isToggle,
      },
      () => {
        if (this.state.isToggle) this.onStartPrgress();
      }
    );
  }

  onStartPrgress() {
    var value = 0.0;
    console.log('check abc');

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
        });
        this.props.onCompleted && this.props.onCompleted();
        return;
      }
      console.log('processing', value);
    }, 45);
  }

  render() {
    let maxWidth = this.props.maxWidth || 300;

    return (
      this.state.isToggle && (
        <div className="popup p-loading">
          <img
            className="background"
            src="https://img.wallpapersafari.com/phone/1080/1920/74/20/weJq6G.jpg"
          />
          <div className="content" style={{ width: maxWidth }}>
            <div className="loading" style={{ width: maxWidth }}>
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
        </div>
      )
    );
  }
}
