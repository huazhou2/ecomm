import React, {Component} from 'react';
import data from '../data/massagedata.json';
import {BrowserRouter as Router } from 'react-router-dom';
import {connect} from 'react-redux';
import {Helmet} from 'react-helmet';
import Routes from './routes.jsx';
const TITLE = 'Lili MassageSupplies';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.name, //provided by connect@mapStateToProps
    };
  }

  render() {
    return (
    <div>
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>
      <Router>
	      <div>
      <Routes data={data}/>

      </div>
      </Router>
    </div>);
  }
}
function mapStateToProps(state) {
  return {
    user: state.name,
  };
}

export default connect(mapStateToProps)(App);
