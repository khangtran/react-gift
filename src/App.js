import React from 'react';
import './style.css';
import Mission from './screen/mission';
import LoadingScreen from './screen/loading';
import RuleScreen from './screen/rule';

export default class App extends React.Component {
  state = {
    toggle: false,
    gift: '',
    ticket: 5,
    isMobile: false,
    isLoading: true,
    progress: 0,
  };

  listGifts = [
    { des: 'Bạn nhận được 10.000đ', value: 10, type: 'money' },
    { des: 'Chúc may mắn lần sau', value: 55, type: 'none' },
    { des: 'Phiếu mua hàng trị giá 1.000.000đ', value: 2, type: 'voucher' },
    { des: 'Giảm 30% Coffee House', value: 7, type: 'voucher' },
    { des: '+20 điểm thưởng', value: 12, type: 'point' },
    { des: '+100 điểm thưởng', value: 9, type: 'point' },
    { des: '+200 điểm thưởng', value: 5, type: 'point' },
  ];

  img = 'https://cdn.dribbble.com/users/1162379/screenshots/6822916/gift.gif';

  timePopup = null;
  timeGift = null;
  timer = null;

  componentDidMount() {
    const isMobile = navigator.userAgentData.mobile;
    console.log('check mobile: ', isMobile);
    this.isMobile = isMobile;
  }

  render() {
    return (
      <div id="app">
        {!this.state.isMobile ? this.NotMobile() : this.Main()}
        <LoadingScreen
          ref={(c) => (this.loading = c)}
          maxWidth={300}
          onCompleted={() => this.setState({ isLoading: false })}
        />
      </div>
    );
  }

  NotMobile() {
    return (
      <div
        style={{
          position: 'absolute',
          textAlign: 'center',
          top: '20%',
          left: 0,
          right: 0,
          margin: '20%',
        }}
      >
        <div className="column" style={{ alignItems: 'center' }}>
          <span>Ứng dụng chỉ chạy trên nền tảng di động</span>
          <div
            className="button bt-normal"
            style={{ width: '200px' }}
            onClick={() => {
              this.setState({ isMobile: true });
              console.log('loading', this.loading);
              this.loading.toggle();
            }}
          >
            <span>Tiếp tục</span>
          </div>
        </div>
      </div>
    );
  }

  Main() {
    return (
      <>
        <div className="header">
          <div className="row">
            <div></div>
            <div className="title">Hộp quà may mắn</div>
            <div></div>
          </div>
        </div>
        <div className="content">
          <div className="wrap">
            {[...Array(9).keys()].map((item, index) => (
              <div
                key={index}
                className="item"
                onClick={() => this.onClickGift(item)}
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
        <div className="float-ticket">
          <span>Vé: {this.state.ticket} lượt</span>
        </div>
        <div className="navigation-bar">
          <div className="content row">
            <span>Túi đồ</span>
            <span onClick={() => this.onTabBarMission()}>Nhiệm vụ</span>
            <span onClick={() => this.onTabbarRule()}>Thể lệ</span>
          </div>
        </div>
        <Mission
          ref={(c) => (this.mission = c)}
          onClick={(value) => this.onUpdateTicket(value)}
        />
        <RuleScreen ref={(c) => (this.rule = c)} />
      </>
    );
  }

  togglePopup() {
    this.setState({
      toggle: !this.state.toggle,
    });
  }

  onTabBarMission() {
    this.mission.toggle();
    console.log('open mission', this.mission);
  }

  onTabbarRule() {
    this.rule.toggle();
  }

  onUpdateTicket(value) {
    this.setState({
      ticket: this.state.ticket + value,
    });
  }

  onClickGift(item) {
    if (this.state.ticket <= 0) {
      alert(
        'Bạn đã sử dụng hết vé mở hộp. Hãy hoàn thành nhiệm vụ để có thêm vé!'
      );
      return;
    }
    this.togglePopup();

    var rnd = this.getRandomInt(0, 100);
    var before = 0;
    var _lst = this.listGifts.sort((a, b) => (a.value > b.value ? 1 : -1));
    console.log({ list: _lst });
    var lst = _lst.map((e, index) => {
      var v = e.value + before;
      before += e.value;
      return { des: e.des, value: v };
    });

    console.log({ list: lst, random: rnd });

    var before = 0;
    var gift = '';
    lst.forEach((e) => {
      if (gift === '' && e.value > rnd - before) {
        gift = e.des;
      }
    });
    this.timeGift = setTimeout(() => {
      this.setState({
        gift: gift,
      });
    }, 2875);

    this.timePopup = setTimeout(() => {
      this.togglePopup();
      this.setState({
        gift: '',
        ticket: this.state.ticket - 1,
      });

      this.timeGift && clearTimeout(this.timeGift);
      this.timePopup && clearTimeout(this.timePopup);
    }, 3800);
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }
}
