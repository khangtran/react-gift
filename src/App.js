import React from 'react';
import './style.css';

export default class App extends React.Component {
  state = {
    toggle: false,
    gift: '',
  };

  listGifts = [
    { des: 'Nạp thẻ Viettel 10K', value: 10 },
    { des: 'Chúc may mắn lần sau', value: 55 },
    { des: 'Phiếu mua hàng trị giá 1.000.000đ', value: 2 },
    { des: 'Giảm 30% Coffee House', value: 8 },
    { des: '+100 điểm thưởng', value: 25 },
  ];

  img = 'https://cdn.dribbble.com/users/1162379/screenshots/6822916/gift.gif';

  timePopup = null;
  timeGift = null;

  render() {
    return (
      <div id="app">
        <div className="header">
          <div className="row">
            <div></div>
            <div className="title">Hộp quà may mắn</div>
            <span>túi đồ</span>
          </div>
        </div>

        <div className="row">
          <span>Thể lệ</span>
          <span></span>
        </div>

        <div className="list">
          {[...Array(9).keys()].map((item, index) => (
            <div
              key={index}
              className="item"
              onClick={() => this.onClick(item)}
            >
              <img
                className="img"
                src="https://raw.githubusercontent.com/khangtran/react-gift/main/public/gift.png"
              />
            </div>
          ))}
        </div>
        {this.state.toggle ? (
          <div className="popup" style={{ display: 'flex' }}>
            <div className="bg">
              <img src={this.img} />
              <span className="gift-text">{this.state.gift}</span>
            </div>
          </div>
        ) : null}
      </div>
    );
  }

  togglePopup() {
    this.setState({
      toggle: !this.state.toggle,
    });
  }

  onClick(item) {
    this.togglePopup();

    var rnd = this.getRandomInt(0, 100);
    var before = 0;
    var lst = this.listGifts.map((e, index) => {
      var v = e.value + before;

      before += e.value;
      return { des: e.des, value: v };
    });

    console.log(lst);

    this.timeGift = setTimeout(() => {
      this.setState({
        gift: rnd,
      });
    }, 1050);

    this.timePopup = setTimeout(() => {
      this.togglePopup();
      this.setState({
        gift: '',
      });

      this.timeGift && clearTimeout(this.timeGift);
      this.timePopup && clearTimeout(this.timePopup);
    }, 1400);

    before = 0;
    lst.forEach((e) => {
      if (e.value > rnd - before) {
      }
    });
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }
}
