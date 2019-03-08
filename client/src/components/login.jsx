import React, {Component} from 'react';
import axios from 'axios';
import {Link, Redirect} from 'react-router-dom';
import {userLogin} from '../reducers/user';
import {connect} from 'react-redux';
//import Register from './register.jsx';

class Login extends Component {
  state = {
    formvalid: true,
    errors: {},
    login: null,
  };

  render() {
    return (
      <form onSubmit={this.checklogin} className="login-form">
        <div>
          <h1>Sign In</h1>
        </div>
        <label>Name: </label>
        <input
          type="text"
          placeholder="Please input your name"
          name="name"
          onChange={this.handleinput}
        />
        <span style={{color: 'red'}}>{this.state.errors.name}</span>
        <br />
        <label>Password: </label>
        <input
          type="text"
          name="password"
          placeholder="please input your password"
          onChange={this.handleinput}
        />
        <span style={{color: 'red'}}>{this.state.errors.password}</span>
        <div className="login-register">
          <div>
            <button type="submit" value="submit">
              Login
            </button>{' '}
          </div>
          <div>
            {' '}
            <Link to="/register">Register</Link>
          </div>
        </div>
        {this.getpage()}
      </form>
    );
  }

  handleinput = e => {
    this.setState({[e.target.name]: e.target.value});
  };
  checkvalid = () => {
    let errors = {};
    let formvalid = true;
    const {name, password} = this.state;
    if (!name) {
      formvalid = false;
      errors.name = 'Please input Name';
    }
    if (!password) {
      formvalid = false;
      errors.password = 'Please input password';
    }
    this.setState({errors: errors});
    return formvalid;
  };

  checklogin = e => {
    const formvalid = this.checkvalid();
    const {name, password} = this.state;
    e.preventDefault();
    let user={};
	  user.name=name;
	  user.password=password;
    if (formvalid) {
	    this.props.userLogin2(user);
    }
  };

  getpage() {
	  console.log(this.props.loggedin);
	  console.log(this.props.group);
    if (this.state.loggedin === true) {
      return <Redirect to="/loggedin" />;
    } else return <h1>{this.state.loggedin}</h1>;
  }
}
const mapStateToProps = state => {
	return {
		loggedin: state.loggedin,
		group:state.group,
		pass:state.password
	};
};
const mapDispatchToProps = dispatch => {
  return {
    userLogin2: (user) => {
      dispatch(userLogin(user));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
