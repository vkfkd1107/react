// **********************
// State 올바르게 사용하기
// **********************

// ----------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------
// 1. 직접 state를 수정하지 말 것
// ----------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------
this.StaticRange.comment = 'Hello';     // 이 코드는 컴포넌트를 다시 렌더링하지 않는다

// >> setState()를 사용한다
this.setState({comment: 'Hello'});
// this.state를 지정할 수 있는 유일한 공간은 constructor이다


// ----------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------
// 2. State 업데이트는 비동기적일 수도 있다
// ----------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------

// : React는 성능을 위해 여러 setState()호출을 단일 업데이트로 한꺼번에 처리할 수 있다

// this.props와 this.state.가 비동기적으로 업데이트 될 수 있기 때문에 
// 다음 state를 계산할 때 해당 값에 의존해서는 안된다

// 아래 코드는 카운터 업데이트에 실패할 수 있다
this.setState({
    counter: this.state.counter + this.props.increment,
});

// 이를 위해 객체보다는 함수를 인자로 사용하는 다른 형태의 setState()를 사용한다
// 이 함수는 이전 state를 첫 번째 인자로 받아들일 것이고, 업데이트가 적용된 시점의 props를 두 번째 인자로 받아들일 것이다
this.setState((state, props) => ({
    counter: state.counter + props.increment
}));

this.setState(function(state, props){
    return {
        counter: state.counter + props.increment
    };
});


// ----------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------
// 3. State업데이트는 병합된다
// ----------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------

// setState() 를 호출할 때 React는 제공한 객체를 현재 state로 병합한다

// state는 다양한 독립적인 변수를 포함할 수 있다

class test extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          posts: [],
          comments: []
        };
    }
    componentDidMount(){
        fetchPosts().then(response => {
            this.setState({
                posts: response.posts
            });
        });
        fetchComments().then(response => {
            this.setState({
                comments: response.comments
            });
        });
    }    
}


// ----------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------
// 4. 데이터는 아래로 흐른다
// ----------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------

// 부모 컴포넌트나 자식 컴포넌트 모두 특정 컴포넌트가 유상태인지 무상태인지 알 수 없고
// 함수인지 클래스인지도 알 필요가 없다

// 이 때문에 state는 로컬 또는 캡슐화라고 불린다
// state가 소유하고 설정한 컴포넌트 이외에는 어떠한 컴포넌트에도 접근할 수 없다
// 컴포넌트는 자신의 state를 자식 컴포넌트에 props로 전달할 수 있다

<FormattedDate date={this.state.date} />

function FormattedDate(props) {
    return <h2>It is {props.date.toLocaleTimeString()}</h2>;
}
// FormattedDate 컴포넌트는 date를 자신의 props로 받을 것이고 이것이 Clock의 state로부터 왔는지,
// Clock의 props에서 왔는지, 수동으로 입력한 것인지 알지 못한다.