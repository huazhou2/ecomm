import React, {Component} from 'react';
import data from '../data/massagedata.json';
import Header from './header.jsx';
import {connect} from 'react-redux';


class App extends Component {
	constructor(props) {
    super(props);
    this.state = {
      user: props.name, //provided by connect@mapStateToProps
    };
  }
	

  render() {
	   
	  return  <Header data={data} loggedin={true} username={this.state.user}/>;
  }
}
function mapStateToProps(state) {
  return {
    user: state.name,
  };
}

export default connect(mapStateToProps)(App);


