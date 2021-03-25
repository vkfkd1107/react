import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { render } from '@testing-library/react';

// <-- state -->
// 비공개이며 컴포넌트에 의해 완전이 제어된다. 정적

// props? state?
// : props는 정적이고 state는 동적이 값. props는 수정할 수 없다

// <-- class 변환 -->  
// 1. React.Component 확장
// 2. render() 추가
// 3. 함수를 render() 안으로 옮기기
// 4. props를 this.props로 변경

// <-- 클래스 -->
// render 메서드는 업데이트 발생할 때 마다 호출
// 같은 DOM 노드로 Clock 을 렌더링하는 경우 Clock 클래스의 단일 인스턴스만 사용된다
//    ->> 로컬 state와 생명주기 메서드와 같은 부가적인 기능 사용

class Clock extends React.Component {
  // class component는 항상 props로 기본 constructor를 호출해야 된다

  // 2. Clock컴포넌트의 constructor를 호출한다
  //    현재 시각이 표시되야하기 때문에 현재 시각이 포함된 객체로 this.state를 초기화 한다
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }
  
  // 마운팅: Clock이 처음 DOM에 렌더링 될 때마다 타이머를 설정하는 것 

  // 4. componentDidMount() 생명주기 메서드를 호출한다
  componentDidMount() {
    // 컴포넌트 출력물이 DOM에 렌더링 된 후에 실행된다. 타이머를 설정하기 좋다

    // timerID: 데이터 흐름 안에 포함되지 않는 항목
    // 이런 것을 보관해야 한다면 클래스에 수동으로 필드를 추가해도 된다
    this.timerID = setInterval(
      // 5. 매초 tick()메서드를 호출한다
      () => this.tick(),
      1000
    );
  }
  // 언마운팅: Clock에 의해 생성된 DOM이 삭제될 때마다 타이머를 해제하는 것
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  // component local state를 업데이트하기 위해 this.setState()를 사용한다

  // 6. Clock component는 setState()에 현재 시각을 포함하는 객체를 호출하면서 UI 업데이트를 진행한다
  tick() {
    // 7. setState로 React는 state가 변경된 것을 인지하고 화면에 표시될 내용을 알아내기 위해 render() 메서드를 다시 호출한다
    this.setState({
      date: new Date()
    });
  }

  // 3. Clock값이 DOM에 삽입된다
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        {/* 8. this.state.date.가 달라지고 출력값은 업데이트된 시각을 포함한다 
            9. React는 이에 따라 DOM을 업데이트 한다
            10. Clock컴포넌트가 DOM으로부터 한 번이라도 삭제된 적이 있다면 
            React는 타이머를 멈추기 위해 componenetWillUnmount() 생명주기 메서드를 호출한다
        */}
        <h2>It is {this.state.date.toLocaleTimeString()}</h2>
      </div>
    );
  }
}

function Test(){
  return (
    <div>
      <Clock />
      <Clock />
      <Clock />
    </div>
  );
}

function ActionLink() {
  function handleClick(e) {
    e.preventDefault();
    alert('The link was clicked');
  }
  return (
    <a href="#" onClick={handleClick}>
      Click me
    </a>
  )
}

ReactDOM.render(
  // 1. Clock이 ReactDOM.render()로 전달된다
  <ActionLink />,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

// reportWebVitals();