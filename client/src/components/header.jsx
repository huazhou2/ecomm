import React, {Component} from 'react';
import {connect} from 'react-redux';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';
import {withRouter, Link} from 'react-router-dom';
import {logoutUser} from '../reducers/actions';
import data from '../data/massagedata.json';

class Header extends Component {
  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
  }

  goBack() {
    this.props.history.goBack();
  }
  onLogout = e => {
    e.preventDefault();
    this.props.logoutUser(this.props.history);
  };

  getGroup1() {
    const groups = [];
    data.forEach(function(item) {
      if (groups.indexOf(item.group1) === -1) {
        groups.push(item.group1);
      }
    });
    return groups;
  }
  getGroup2(groupname) {
    const groups = [];
    data.filter(item => item.group1 === groupname).forEach(item => {
      if (groups.indexOf(item.group2) === -1) {
        groups.push(item.group2);
      }
    });
    return groups;
  }

  topright_menu() {
    const {isAuthenticated, user} = this.props.auth;
    return (
      <ul className="navbar-nav">
        <li className="nav-item dropdown" key="navall">
          {isAuthenticated ? (
            <a
              href="/"
              className="dropdown-toggle"
              data-toggle="dropdown"
              role="button"
              aria-haspopup="true"
              aria-expanded="false">
              {user.name}
            </a>
          ) : (
            <a
              href="/"
              data-toggle="dropdown"
              role="button"
              aria-haspopup="true"
              aria-expanded="false">
              {user.name}
            </a>
          )}

          {isAuthenticated ? (
            <ul className="dropdown-menu">
              <li key="navall1">
                <Link to="/accounts/:id">Your account</Link>
              </li>
              <li key="navall2">
                <Link to="/logout">Log out</Link>
              </li>
            </ul>
          ) : (
            <Link to="/login">Signin/Register</Link>
          )}
        </li>
      </ul>
    );
  }
  render() {
    return (
      <div style={{fontSize: '1.3em'}}>
        <nav className="navbar navbar-expand-sm navbar-light bg-dark fixed-top">
          <div className="col-lg-3 col-md-6 my-sm-3 d-flex flex-row justify-content-between">
            {this.props.location.pathname !== '/' && (
              <span className='d-block d-md-none' onClick={this.goBack}>
                {' '}
                <i className="fa fa-arrow-left fa-2x " />
              </span>
            )}
            <a
              className="navbar-brand ml-sm-2 text-white d-inline-block"
              href="/">
              Lily Massage Supplies{' '}
            </a>

            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#storemenu">
              <span className="navbar-toggler-icon" />
            </button>
          </div>

          <div className="collapse navbar-collapse  d-md-block" id="storemenu">
            <ul className="navbar-nav col-lg-3 col-md-6 d-flex justify-content-between align-items-stretch">
              {this.getGroup1().map((item, i) => (
                <li className="nav-item dropdown" key={i}>
                  <a
                    href="/"
                    className="dropdown-toggle"
                    data-toggle="dropdown"
                    role="button"
                    aria-haspopup="true"
                    aria-expanded="false">
                    {item}
                  </a>
                  <ul className="dropdown-menu">
                    {this.getGroup2(item).map((item2, j) => (
                      <li key={j}
                          clasName="navbar-toggler"
                          data-target=".navbar-collapse.show"
			  //data-toggle={`${window.innerWidth< 500 ? "collapse":""}`} key={j}>
			    data-toggle='collapse'
			    key={j}>
                        <Link
                          to={`/groups/${item2}`}>
                          {' '}
                          {item2}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
            <div className="mx-sm-auto">{this.topright_menu()}</div>
            <div className="input-group col-lg-4 pl-0">
              <input
                className="form-control"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <div class="input-group-append">
                <button class="btn btn-primary" type="button">
                  <i class="fa fa-search" />
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    {logoutUser},
  )(Header),
);
