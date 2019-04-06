import React, {Component} from 'react';
import {connect} from 'react-redux';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';
import {withRouter, Link} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';

//add in some random stuff
class MyCarts extends Component {
 

  render() {
    const dataimg = this.props.products;
    return (
      <div className="center_body">
        {dataimg.map((item,i) => (
          <div  className="row" key={`cart_prod_${i}`}>
              <div  className="container col-xs-12 col-sm-3 col-md-2 text-center mx-1 mb-3" key={i}>
		  <a  className='d-block d-flex flex-xs-row flex-sm-column justify-content-start justify-content-sm-between align-items-center h-100 bg-light border-bottom' style={{textDecoration:'none'}} href={`/products/${item.name}`}>   
			  <img id='thum_img' src={`/static/${item.linkimg}`}  alt="noimg"/>
	
		<span className='flex-grow-1 flex-sm-grow-0' > <h5> {item.name}</h5>  Price ${item.desc} Quantity: {item.quantity} </span>


	</a>
              </div>
          </div>
            ))}
          </div>
    )
  }
}
const mapStateToProps = state => {
	  return {
		      products:state.products,
		    };
};


export default withRouter(
	  connect(
		      mapStateToProps,
		  {},
		    )(MyCarts),
);

