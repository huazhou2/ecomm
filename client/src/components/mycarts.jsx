import React, {Component} from 'react';
import {connect} from 'react-redux';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';
import {clearCart, updateCart} from '../reducers/actions';
import {withRouter} from 'react-router-dom';

class MyCarts extends Component {
  handleClear = e => {
    e.preventDefault();
    this.props.clearCart(this.props.auth.isAuthenticated);
  };
  handleInputChange = event => {
    const products = this.props.products;
    for (let i in products) {
      if (
        products[i].name + '_' + products[i].color + '_' + products[i].size ===
        event.target.name
      ) {
        if (event.target.value === '0') {
          products.splice(i, 1);
        } else products[i].quantity = event.target.value;
        this.setState({product: products});
        this.props.updateCart(products, this.props.auth.isAuthenticated);
      }
    }
  };

  render() {
    const {products} = this.props;
    const quant = (
      products.reduce((a, b) => +a + +b.quantity * +b.price, 0) || 0
    ).toFixed(2);

    return (
      <div className="center_body">
        {products.length ? (
          <div>
            {products.map((item, i) => (
              <div className="row" key={`cart_prod_${i}`}>
                <div
                  className="container col-xs-12 col-sm-8 col-md-8 mx-sm-auto text-center mx-1 mb-3"
                  key={i}>
                  <div
                    className="d-block d-flex flex-xs-row flex-sm-row justify-content-center justify-content-sm-between align-items-center h-100 bg-light border-bottom"
                    style={{textDecoration: 'none'}}>
                    <a
			    id='cart_layout'
                      className="d-block d-flex flex-xs-row flex-sm-row justify-content-start justify-content-sm-around align-items-center h-100 bg-light border-bottom"
                      href={`/products/${item.name}`}
                      style={{textDecoration: 'none'}}>
                      <img
			  className='ml-0 pl-0 mr-auto'
                        id="cart_img"
                        src={`/static/${item.linkimg}`}
                        alt="noimg"
                      />

                      <span className="flex-grow-1 flex-sm-grow-0">
                        {' '}
                        <h5> {item.name}</h5> Price ${item.price}
                      </span>
                    </a>
                    <span className="flex-grow-1 flex-sm-grow-0 mx-auto form-inline">
                      <label className='mr-3' >Quantity   </label>
                      <select
                        id={`item_${i}`}
                        name={`${item.name}_${item.color}_${item.size}`}
                        // target={`${item.name}${item.color}`}
                        className="form-control mb-1"
                        onChange={this.handleInputChange}
                        value={+item.quantity}>
                        {[...Array(9).keys()].map((prod, j) => (
                          <option value={prod} key={`quantity_${j}`}>
                            {prod}
                          </option>
                        ))}
                      </select>
                    </span>
                  </div>
                </div>
              </div>
            ))}
            <div className="d-flex justify-content-center">
              <h4>total cost is ${quant}</h4>
            </div>
	    <div className="d-flex justify-content-between justify-content-xs-around col-xs-12 col-sm-8 col-md-8 mx-sm-auto text-center mx-1 mb-3">
              <button
                type="submit"
                className="btn btn-warning"
                onClick={this.handleClear}>
                Clear Cart
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={this.handleCheck}>
                CheckOut
              </button>
            </div>
          </div>
        ) : (
          <h4>Your Cart is Empty</h4>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    auth: state.auth,
    products: state.products,
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    {clearCart, updateCart},
  )(MyCarts),
);
