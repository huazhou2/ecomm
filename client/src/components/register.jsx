import React, {Component} from 'react';
import axios from 'axios';
import {Link, Redirect} from 'react-router-dom';
import {createUser} from '../reducers/user';
import {connect} from 'react-redux';

class Register extends Component {
  state = {
    formvalid: true,
    errors: {},
    login: null,
  };

  render() {
    return (
      <form onSubmit={this.putdata} className="login-form">
        <div>
          <h1>Register</h1>
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

  putdata = e => {
    const formvalid = this.checkvalid();
    const {name, password} = this.state;
    e.preventDefault();
    if (formvalid) {
	    this.props.createUser({name,password});
    }
  };
  getpage() {
    if (this.state.login === 'all good') {
      console.log('inside getpage', this.state.name);
      this.props.getuser(this.state.name);
      return <Redirect to="/loggedin" />;
    } else return <h1>{this.state.login}</h1>;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createUser: (user) => {
      dispatch(createUser(user));
    },
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(Register);
