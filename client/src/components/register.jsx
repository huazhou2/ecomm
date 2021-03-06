import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import {registerUser} from '../reducers/actions';
import classnames from 'classnames';
class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      password_confirm: '',
      errors: {},
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password_confirm: this.state.password_confirm,
    };
    this.props.registerUser(user, this.props.history);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/');
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/');
    }
  }

  render() {
    const {errors} = this.state;
    return (
      //<div className="container col-md-6 col-lg-4" style={{ marginTop: '120px', maxWidth: '700px'}}>
      <div
        className="container d-flex flex-column justify-content-center 
			bg-light border border-information mx-auto rounded mt-0 mt-sm-4 py-5"
        style={{ maxWidth: '600px'}}>
        <Link
          to="/"
          style={{textDecoration: 'none'}}
          className="d-block text-center text-primary mt-3 mb-5">
          <h2 className='fa fa-home fa-3x'> Lili Massage Supplies</h2>
        </Link>
        <h2 style={{marginBottom: '40px'}}>Registration</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Name"
              className={classnames('form-control form-control-lg', {
                'is-invalid': errors.name,
              })}
              name="name"
              onChange={this.handleInputChange}
              value={this.state.name}
            />
            {errors.name && (
              <div className="invalid-feedback">{errors.name}</div>
            )}
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              form="novalidatedform"
              className={classnames('form-control form-control-lg', {
                'is-invalid': errors.email,
              })}
              name="email"
              onChange={this.handleInputChange}
              value={this.state.email}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              className={classnames('form-control form-control-lg', {
                'is-invalid': errors.password,
              })}
              name="password"
              onChange={this.handleInputChange}
              value={this.state.password}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              className={classnames('form-control form-control-lg', {
                'is-invalid': errors.password_confirm,
              })}
              name="password_confirm"
              onChange={this.handleInputChange}
              value={this.state.password_confirm}
            />
            {errors.password_confirm && (
              <div className="invalid-feedback">{errors.password_confirm}</div>
            )}
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Register User
            </button>
            <Link to="/login" className="ml-3 d-inline-block">
             Login 
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(
  mapStateToProps,
  {registerUser},
)(withRouter(Register));
