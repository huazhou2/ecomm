import React, {Component} from 'react';
import Login from './login.jsx';
import 'bootstrap/dist/css/bootstrap.css';

class Logins extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-sm-4" />
        <div className="col-sm-4">
          <Login />
        </div>
      </div>
    );
  }
}
export default Logins;
