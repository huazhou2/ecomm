const GoBack extends Component {
constructor(props){
	   super(props);
	   this.goBack = this.goBack.bind(this); // i think you are missing this
}

handlegoBack(){
	    this.props.history.goBack();
}


render() { 
	return (
	<button onClick={this.handlegoBack()}>Go Back</button>
	);
}
}

export default withRouter(GoBack);


