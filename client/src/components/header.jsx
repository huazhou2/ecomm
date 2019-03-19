import React, {Component} from 'react';
import {connect} from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap';
import {
  withRouter,
  Link
} from 'react-router-dom';

class Header extends Component {
  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
  }

  goBack() {
    this.props.history.goBack();
  }

  getGroup1() {
    const {data} = this.props;
    const groups = [];
    data.forEach(function(item) {
      if (groups.indexOf(item.group1) === -1) {
        groups.push(item.group1);
      }
    });
    return groups;
  }
  getGroup2(groupname) {
    const {data} = this.props;
    const groups = [];
    data.filter(item => item.group1 === groupname).forEach(item => {
      if (groups.indexOf(item.group2) === -1) {
        groups.push(item.group2);
      }
    });
    return groups;
  }

  topright_menu() {
    const {loggedin, name} = this.props;
    return (
      <ul className="navbar-nav ml-auto mt-2 mt-lg-3 ">
        <li className="nav-item dropdown">
          {loggedin ? (
            <a
              href="/"
              className="dropdown-toggle"
              data-toggle="dropdown"
              role="button"
              aria-haspopup="true"
              aria-expanded="false">
              {name}
            </a>
          ) : (
            <a
              href="/"
              data-toggle="dropdown"
              role="button"
              aria-haspopup="true"
              aria-expanded="false">
              {name}
            </a>
          )}

          {loggedin ? (
            <ul className="dropdown-menu">
              <li>
                <Link to="/accounts/:id">Your account</Link>
              </li>
              <li>
                <Link to="/logout">Logout</Link>
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
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
		{this.props.location.pathname!=='/' && <a href='/' onClick={this.goBack} > <i className="fa fa-arrow-left "/></a>}

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#storemenu">
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse hide d-sm-block" id="storemenu">
            <a className="navbar-brand" href="/">
              Lily Massage Supplies{' '}
            </a>
            <ul className="navbar-nav ml-auto mt-2 mt-lg-3">
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
             >
			      <Link to={`/groups/${item2}`}
            > {item2}</Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>

            {this.topright_menu()}

            <form className="form-inline mx-auto my-2 my-lg-3">
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                className="btn btn-outline-success my-2 my-sm-0"
                type="submit">
                Search
              </button>
            </form>
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    name: state.name,
    group: state.group,
    loggedin: state.loggedin,
    pass: state.password,
    message: state.message,
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    null,
  )(Header),
);
