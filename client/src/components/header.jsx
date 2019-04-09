import React, {Component} from 'react';
import {connect} from 'react-redux';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';
import {withRouter, Link} from 'react-router-dom';
import {logoutUser} from '../reducers/actions';
import data from '../data/massagedata.json';
import SearchBar from './searchbar';
import ShopCart from './shopcart';

class Header extends Component {
  goBack = () => {
    this.props.history.goBack();
  };
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
      <div>
        <ul className="navbar-nav d-flex justify-content-center">
          <li className="nav-item dropdown" key="navall">
            {isAuthenticated ? (
              <a
                href="/"
                data-toggle="dropdown"
                role="button"
                aria-haspopup="true"
                aria-expanded="false">
                <img
                  src={user.avatar}
                  alt={user.name}
                  title={user.name}
                  className="rounded-circle"
                  style={{width: '25px', marginRight: '5px'}}
                />
                <i className="fa fa-angle-down py-2 float-right d-block" />
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
          <li className="d-none d-sm-block">
            <ShopCart />
          </li>
        </ul>
      </div>
    );
  }
  render() {
    return (
      <div style={{fontSize: '1.25em'}}>
        <nav className="navbar navbar-expand-sm navbar-light bg-dark fixed-top px-0">
          <div className="col-xs-12 col-sm-4 col-lg-3 col-md-6 my-sm-3 d-flex flex-row justify-content-between ml-0">
            {this.props.location.pathname !== '/' && (
              <span className="d-block d-md-none mr-1 text-white mt-1" style={{fontSize:'0.7em',marginLeft:'-10px'}} onClick={this.goBack}>
                {' '}
                <i className="fa fa-arrow-left fa-2x " />
              </span>
            )}
            <a className="navbar-brand ml-sm-2 text-white d-block" href="/">
              Lily Massage Supplies{' '}
            </a>
            <span className="d-block d-sm-none mr-1" style={{marginLeft:'-25px'}}>
              <ShopCart />
            </span>

            <button
              className="navbar-toggler mr-2"
              type="button"
              data-toggle="collapse"
              data-target="#storemenu">
              <span className="navbar-toggler-icon" />
            </button>
          </div>

          <div
            className="collapse navbar-collapse hide d-md-block"
            id="storemenu">
            <ul className="navbar-nav col-xs-12 col-md-6 col-lg-3 d-flex justify-content-between pl-3">
              {this.getGroup1().map((item, i) => (
                <li className="nav-item dropdown" key={i}>
                  <a
                    href="/"
                    className="d-block text-warning"
                    data-toggle="dropdown"
                    role="button"
                    aria-haspopup="true"
                    aria-expanded="false">
                    {item}
                    <i className="fa fa-angle-down py-2 pl-2 float-right d-block" />
                  </a>
                  <ul className="dropdown-menu bg-secondary">
                    {this.getGroup2(item).map((item2, j) => (
                      <li
                        key={j}
                        className="nav-item"
                        data-toggle="collapse"
                        data-target=".navbar-collapse.show">
                        <Link to={`/groups/${item2}`}>
                          {' '}
                          <span className="text-warning"> {item2}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
            <div className="col-xs-12 col-sm-6 col-md-4">
              {this.topright_menu()}
            </div>
            <div className="input-group col-xs-12 col-sm-6 col-md-4">
              <SearchBar />
            </div>
          </div>
        </nav>
        <div className="spacer">&nbsp;</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    products: state.products,
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    {logoutUser},
  )(Header),
);
