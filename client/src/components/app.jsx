import React, {Component} from 'react';
import data from '../data/massagedata.json';
import Header from './header.jsx';
import {connect} from 'react-redux';
import {Helmet} from 'react-helmet';
const TITLE='Lili MassageSupplies';


class App extends Component {
	constructor(props) {
    super(props);
    this.state = {
      user: props.name, //provided by connect@mapStateToProps
    };
  }
	

  render() {
	   
	  return  <Header data={data} loggedin={true} username={this.state.user}>
		  <Helmet>
			<title>{TITLE}</title>
			</Helmet>
	  </Header>;
  }
}
function mapStateToProps(state) {
  return {
    user: state.name,
  };
}

export default connect(mapStateToProps)(App);


