import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { render } from '@testing-library/react';


class Clock extends React.Component {
  // 1. constructor 호출
  constructor(props) {
    super(props);
    // 2. 현재 시각이 포함된 객체로 this.state 초기화
    this.state = {date: new Date()};
  }

  // 6. componentDidMount() 생명주기 메서드를 호출한다
  // 7. 매초 컴포넌트의 tick() 메서드를 호출하기 위한 타이머를 설정하도록 브라우저에 요청한다
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  // 13. Clock컴포넌트가 DOM으로부터 한 번이라도 삭제된 적이 있다면 
  //      React는 타이머를 멈추기 위해 componentWillUnmount() 생명주기 메서드를 호출한다
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  // 8. 매초 브라우저가 tick() 메서드를 호출한다
  // 9. Clock 컴포넌트는 setState에서 현재 시각을 포함하는 객체를 호출하면서 UI업데이트를 진행한다
  // 10. setState메서드로 인해 React는 state가 변경된 것을 인지하고 
  //      화면에 표시될 내용을 알아내기 위해 render() 메서드를 다시 호출한다

  tick() {
    this.setState({
      date: new Date()
    });
  }

  // 3. render() 메서드 호출 ->> React는 화면에 표시되어야 할 내용을 알게 된다
  // 4. React는 Clock의 렌더링 출력값을 일치시키기 위해 DOM을 업데이트한다
  // 5. Clock의 출력값이 DOM에 삽입된다
  
  // 11. this.state.date.가 달라지고 렌더링 출력값은 업데이트된 시각을 포함한다
  // 12. React는 이에 따라 DOM을 업데이트한다
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}</h2>
      </div>
    );    
  }
}


ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

// reportWebVitals();
