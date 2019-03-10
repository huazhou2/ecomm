import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {userLogin} from '../reducers/user';
import {connect} from 'react-redux';
//import Register from './register.jsx';

class Login extends Component {
  state = {
    formvalid: false,
    errors: {},
  };

  render() {
    return (
	    <div className='row'>
		    <div className='col-sm-4'/>
		    <div className='col-sm-4'>

      <form onSubmit={this.checklogin} className="login-form">
        <div>
          <h1>Sign In</h1>
        </div>
        <label>Name: </label>
        <input
	  style={{width:"80%"}}
          type="text"
          placeholder="Please input your name"
          name="name"
          onChange={this.handleinput}
        />
        <span style={{color: 'red'}}>{this.state.errors.name}</span>
        <br />
        <label>Password: </label>
        <input
	  style={{width:"80%"}}
          type="password"
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
            <Link to="/register">Register</Link>
          </div>
        </div>
	<div >
     {this.getpage()}
     </div>
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

  checklogin = e => {
    const formvalid = this.checkvalid();
    const {name, password} = this.state;
    e.preventDefault();
    if (formvalid) {
      this.props.userLogin({name, password});
    }
  };

  getpage() {
    if (this.props.loggedin === true) {
	    console.log(this.props.group)
	    if (this.props.group==='regular')
      return <Redirect to="/" />;
	    else 
      return <Redirect to="/admin" />;
    } else {
      const {formvalid} = this.state;
	    if (formvalid) return <h1 style={{color:"red",width:'400px'}}>{this.props.message}</h1>;
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
    userLogin: ({name, password}) => {
      dispatch(userLogin({name, password}));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
