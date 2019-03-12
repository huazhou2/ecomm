import React, {Component} from 'react';
import headimg from '../static/headimg.jpeg';
import {connect} from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import {Route, Switch, BrowserRouter as Router, Link} from 'react-router-dom';
import Main from './main.jsx';
import Group from './group.jsx';
import Login from './login.jsx';
import Register from './register.jsx';
import Admin from './admin.jsx';
import Logout from './logout.jsx';

class Header extends Component {
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
    return loggedin ? (
      <ul>
        <li className="dropdown">
          {name}
          <div className="dropdown-content">
            <span key="acc1">
              <Link to="/groups/1">Your account</Link>
            </span>
            <span key="acc2">
              <Link to="/logout">Logout</Link>
            </span>
          </div>{' '}
        </li>
      </ul>
    ) : (
      <Link to="/login">Signin/Register</Link>
    );
  }
  render() {
    const {data, loggedin} = this.props;
    return (
      <Router>
        <div>
          <div className="jumbotron text-center">
            <h1>Lily Massage Supplies {loggedin}</h1>
            <img
              src={headimg}
              className="rounded center-block"
              style={{width: 'auto', maxHeight: '100px'}}
              alt="not here"
            />
          </div>
          <div className="row">
            <div className="col-sm-2" />
            <div className="col-sm-8">
              <div className="center_head">
                <ul>
                  {this.getGroup1().map((item, i) => (
                    <li className="dropdown" key={i}>
                      {item}
                      <div className="dropdown-content">
                        {this.getGroup2(item).map((item2, j) => (
                          <span key={j}>
                            <Link to={`/groups/${item2}`}>{item2}</Link>
                          </span>
                        ))}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="col-sm-2">
              <span className="sign_in" key={11}>
                {this.topright_menu()}
              </span>
            </div>
          </div>
          <Switch>
            <Route exact path="/" render={() => <Main data={data} />} />
            <Route path="/groups/:id1" render={() => <Group data={data} />} />
            <Route exact path="/login" render={() => <Login data={data} />} />
            <Route exact path="/logout" render={() => <Logout data={data} />} />
            <Route
              exact
              path="/register"
              render={() => <Register data={data} />}
            />
            <Route exact path="/admin" render={() => <Admin data={data} />} />
          </Switch>
        </div>
      </Router>
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

export default connect(
  mapStateToProps,
  null,
)(Header);
