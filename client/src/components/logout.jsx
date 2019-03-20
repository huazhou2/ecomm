import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
//import {userLogout} from "../reducers/authentication.jsx";

class Logout extends Component {

	//	  componentWillMount() {
	//	      this.props.dispatch(userLogout());
	//	    }

	  render() {
		      return (
			            <Redirect to="/" />
			          );
		    }

}

export default connect()(Logout);
