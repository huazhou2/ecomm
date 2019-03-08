import React, {Component} from 'react';
import axios from 'axios';

class Login extends Component {
  state = {
    data: [],
    name: null,
    password: null,
  };
  componentDidMount() {
    this.getdata();
  }

  getdata = () => {
    fetch('/api/getdata')
      .then(res => res.json())
      .then(data => this.setState({data: data}));
  };
  render() {
    return (
      <div>
        <h1> this is login</h1>
        {this.showdata()}
        <form>
          <label>Name: </label>
          <input
            type="text"
            placeholder="Please input your name"
            name="name"
            onChange={this.handleinput}
          />
          <br />
          <label>Password: </label>
          <input
            type="text"
            name="password"
            placeholder="please input your password"
            onChange={this.handleinput}
          />
          <br />
          <button
            type="btn btn-primary"
            style={{marginLeft: '300px'}}
            onClick={this.putdata}>
            Submit
          </button>
        </form>
      </div>
    );
  }
  handleinput = e => {
    this.setState({[e.target.name]: e.target.value});
    console.log(this.state);
  };
  putdata = e => {
    const {name, password} = this.state;
    e.preventDefault();
    axios.post('/api/putdata', {
      name: name,
      password: password,
    });
  };

  showdata = () => {
    const {data} = this.state;
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

export default Login;
