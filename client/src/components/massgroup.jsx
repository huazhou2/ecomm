import React, {Component} from 'react';

class MassGroup extends Component {
	//const data = require('../data/massagedata.json'); 
  render() {
    return (
	    <div className='header'>
		    <div class='btn-group'>
			    <button type='button' className='btn btn-primary' data-toggle='dropdown'/>

			    
		    <li class='dropdown'>
			    <a href='https://www.google.com'> {this.props.groupname}</a>
	      <div class='dropdown-content'>
		      {this.props.contents.map(item => <a href='#'> {item}</a>)}
	      </div>
      </li>
      </div?
      </div?
    );
  }
}
export default MassGroup;
