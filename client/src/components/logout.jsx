import { Component } from "react";
import { connect } from "react-redux";
import {logoutUser} from "../reducers/actions";
import {withRouter} from "react-router";

class Logout extends Component {

	//	  componentWillMount() {
	//	      this.props.dispatch(userLogout());
	//	    }
	componentDidMount() {
		this.props.logoutUser(this.props.history);
	}
	render()
	{return null;}


}

export default withRouter(connect(null, { logoutUser })(Logout));
