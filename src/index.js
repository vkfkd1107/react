import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { render } from '@testing-library/react';


function BoilingVerdict(props) {
  if(props.celsius >= 100) {
    return <p>The water would boil</p>
  }
  return <p>The water would not boil</p>
}

const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};

// 이렇게 하면 두 개다의 입력값이 갱신되지 않는다

// React에서 state를 공유하는 일은 
// 그 값을 필요로 하는 컴포넌트 간의 가장 가까운 공통 조상으로 
// state를 끌어올려 공유할 수 있다
// 이것을 state 끌어올리기라고 부른다

// TemperatureInput이 개별적으로 가지고 있던 지역 state를 지우는 대신
// Temperature의 조상인 Calculator로 그 값을 옮겨놓는다
class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    // this.state = {temperature: ''};
  }
  handleChange(e) {
    // this.setState({temperature: e.target.value});
    this.props.onTemperatureChange(e.target.value);
  }
  render() {
    // this.state.temperature를 this.props.temperature로 바꿨다
    // props는 읽기 전용이다
    // temperature가 state일때는 변경하기 위해 Temperature의 this.setState()를 호출하는 것으로 충분했지만
    // temperature가 읽기 전용인 props로 바뀌었기 때문에 temperature에 부모로부터 props로 전달된다
    // TemperatureInput은 temperature값을 제어할 능력이 없다

    
    // React는 이 문제를 컴포넌트를 제어 가능하게 만드는 방식으로 해결하는데 
    // DOM <input>이 value와 onChange prop을 건네받는 것과 비슷한 방식으로,
    
    // TemperatureInput 역시 temperature와 onTemperatureChange props를 
    // 자신의 부모인 Calculator로부터 건네받을 수 있다

    // TempeartureInput에서 온도를 갱신하고 싶으면 this.props.onTemperatureChange 를 호출하면 된다
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input 
          value={temperature}
          onChange={this.handleChange}
        />
      </fieldset>
    );
  }
}

// 섭씨와 화씨를 변환해주는 함수
function toCelsius(fahrenheit) {
  return (fahrenheit -32)*5/9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 /5)+32;
}

// temperature: 사용자가 입력하는 수. convert: 섭씨와 화씨를 변환해주는 함수
// 올바른 입력값에 대하여 소수값을 반환하고 올바르지 않은 값에 대하여 빈 문자열을 반환한다
function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

// BoilingVerdict도 보여줄 수 없다. 
// 현재 입력된 정보가 TemperatureInput 안에 숨겨져 있으므로 
// Calculator는 그 값을 알 수 없기 때문이다


class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.state = {temperature: '', scale: 'c'};
  }
  handleCelsiusChange(temperature) {
    this.setState({scale: 'c', temperature});
  }
  handleFahrenheitChange(temperature) {
    this.setState({scale: 'f', temperature});
  }
  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;
    return (
      <div>
        <TemperatureInput 
          scale="c" 
          temperature={celsius}
          onTemperatureChange={this.handleCelsiusChange}
        />
        <TemperatureInput 
          scale="f" 
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange}
        />
        <BoilingVerdict 
          celsius={parseFloat(celsius)}
        />
      </div>
    );
  }
}

ReactDOM.render(
  <Calculator />,
  document.getElementById('root')
);