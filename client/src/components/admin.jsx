import React, {Component} from 'react';
import {connect} from 'react-redux';
//import {GET_ERRORS} from '../reducers/actions';
import axios from 'axios';
import {withRouter} from 'react-router';

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
      .get('/api/customers/getdata')
		  .then(res => this.setState({data: res.data}))
		  .catch(err => this.props.history.push('/')) ;
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
    console.log(data);
    //if (!data) return;
    return (
      <div className="row">
        <div className="col-sm-4" />
        <div className="col-sm-4">
          <table className="table">
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
	  auth:state.auth
  };
}

export default withRouter(connect(mapStateToProps)(Admin));
