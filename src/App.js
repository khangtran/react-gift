import React from 'react';
import './style.css';

export default class App extends React.Component {
  listGifts = [
    { des: 'Nạp thẻ Viettel 10K', value: 10 },
    { des: 'Chúc may mắn lần sau', value: 55 },
    { des: 'Phiếu mua hàng trị giá 1.000.000đ', value: 2 },
    { des: 'Giảm 30% Coffee House', value: 8 },
    { des: '+100 điểm thưởng', value: 25 },
  ];

  render() {
    return (
      <div id="app">
        <div className="header">
          <div></div>
          <div>Hộp quà may mắn</div>
          <span>Kho đồ</span>
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
                src="https://cdn.dribbble.com/users/1162379/screenshots/6822916/gift.gif"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  onClick(item) {
    var rnd = this.getRandomInt(0, 100);
    var before = 0;
    var lst = this.listGifts.map((e, index) => {
      var v = e.value + before;

      before += e.value;
      return { des: e.des, value: v };
    });

    console.log(lst);

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
