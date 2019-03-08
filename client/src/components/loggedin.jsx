import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
class Loggedin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user, //provided by connect@mapStateToProps
    };
  }
  componentDidMount() {
    this.getdata();
  }
  getdata = () => {
    axios
      .get('/customers/getdata')
      .then(res => this.setState({data: res.data}));
  };

  render() {
    return (
      <div>
        <h1> you are successfully logged in {this.props.user}</h1>
        {this.showdata()}
      </div>
    );
  }

  showdata = () => {
    const {data} = this.state;
    console.log(data);
    if (!data) return;
    return (
      <table>
        <tbody>
          <tr>
            <th>name</th>
            <th>password</th>
          </tr>
          {data.map((item, i) => (
            <tr key={i}>
              <td>{item.name}</td>
              <td>{item.password}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(Loggedin);
