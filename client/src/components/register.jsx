import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {createUser} from '../reducers/user';
import {connect} from 'react-redux';

class Register extends Component {
  state = {
    formvalid: false,
    errors: {},
  };

  render() {
    return (
	    <div className='row'>
		    <div className='col-sm-5'/>
		    <div className='col-sm-4'>

      <form onSubmit={this.checkregister} className="login-form">
        <div>
          <h1>Register</h1>
        </div>
        <label>Name: </label>
        <input
	  style={{width:"300px"}}
          type="text"
          placeholder="Please input your name"
          name="name"
          onChange={this.handleinput}
        />
        <span style={{color: 'red'}}>{this.state.errors.name}</span>
        <br />
        <label>Password: </label>
        <input
	  style={{width:"300px"}}
          type="text"
          name="password"
          placeholder="please input your password"
          onChange={this.handleinput}
        />
        <span style={{color: 'red'}}>{this.state.errors.password}</span>
        <div className="register-register">
            <button type="submit" value="submit">
             Submit 
            </button>
          </div>
        {this.getpage()}
      </form>
      </div>
      </div>
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
    this.setState({
      formvalid: formvalid,
      errors: errors,
    });
    return formvalid;
  };

  checkregister = e => {
    const formvalid = this.checkvalid();
    const {name, password} = this.state;
    e.preventDefault();
    if (formvalid) {
      this.props.createUser({name, password});
    }
  };

  getpage() {
    if (this.props.loggedin === true) {
      return <Redirect to="/" />;
    } else {
      const {formvalid} = this.state;
	    if (formvalid) return <h1 style={{color:"red"}}> {this.props.message}</h1>;
    }
  }
}
const mapStateToProps = state => {
  return {
    group: state.group,
    loggedin: state.loggedin,
    pass: state.password,
    message: state.message,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    createUser: ({name, password}) => {
      dispatch(createUser({name, password}));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Register);
