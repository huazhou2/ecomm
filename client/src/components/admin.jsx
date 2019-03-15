import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  componentDidMount() {
    this.getdata();
  }
  getdata = () => {
    axios
		  .get('/massage/customers/getdata')
      .then(res => this.setState({data: res.data}));
  };

  render() {
    return (
      <div>
        <h1>
          Welcome {this.props.group} {this.props.name}
        </h1>
	{this.showdata()}
      </div>
    );
  }

  showdata = () => {
    const {data} = this.state;
    if (!data) return;
    return (
      <div className="row">
        <div className="col-sm-4" />
        <div className="col-sm-4">
          <table className='table'>
            <tbody>
              <tr>
                <th>name</th>
                <th>password</th>
                <th>group</th>
                <th>products</th>
              </tr>
              {data.map((item, i) => (
                <tr key={i}>
                  <td>{item.name}</td>
                  <td>{item.password}</td>
                  <td>{item.group}</td>
                  <td>{item.products.join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
}

function mapStateToProps(state) {
  return {
    name: state.name,
    password: state.password,
    group: state.group,
    message: state.message,
    products: state.products,
  };
}

export default connect(mapStateToProps)(Admin);
