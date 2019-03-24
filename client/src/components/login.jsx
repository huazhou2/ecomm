import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../reducers/actions';
import classnames from 'classnames';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router';

class Login extends Component {

    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password,
        }
        this.props.loginUser(user);
    }

	   componentDidMount() {
        if(this.props.auth.isAuthenticated) {
		if (this.props.auth.user.group ==='admin') 
            this.props.history.push('/admin');
		else
            this.props.history.push('/');
        }
    }


	 componentWillReceiveProps(nextProps) {
        if(nextProps.auth.isAuthenticated) {
		if (nextProps.auth.user.group ==='admin') 
            this.props.history.push('/admin');
		else
            this.props.history.push('/')
        }
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    render() {
        const {errors} = this.state;
        return(
        <div className="container d-flex flex-column justify-content-center border border-information mx-auto" style={{ marginTop: '120px', maxWidth: '800px'}}>

            <h2  className='ml-0' style={{marginBottom: '40px'}}>Login</h2>
            <form onSubmit={ this.handleSubmit }>
                <div className="form-group">
                    <input
                    type="email"
                    placeholder="Email"
		    form="novalidatedform"
                    className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.email
                    })}
                    name="email"
                    onChange={ this.handleInputChange }
                    value={ this.state.email }
                    />
                    {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                </div>
                <div className="form-group">
                    <input
                    type="password"
                    placeholder="Password"
                    className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.password
                    })}
                    name="password"
                    onChange={ this.handleInputChange }
                    value={ this.state.password }
                    />
                    {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">
                        Login User
                    </button>
            <Link to="/register" className="ml-2 d-inline-block">Register</Link>
                </div>
            </form>
        </div>
        )
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}


const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})


export  default withRouter(connect(mapStateToProps, { loginUser })(Login));
