import React, {Component} from 'react';
import {connect} from 'react-redux';
//import 'font-awesome/css/font-awesome.min.css';
//import 'bootstrap/dist/css/bootstrap.css';
//import 'bootstrap';
import {withRouter} from 'react-router-dom';

class ShopCart extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      this.setState({
        products: nextProps,
      });
    }
  }

  render() {
    const {products} = this.props;
    const quant = products.reduce((a, b) => +a + +b.quantity, 0) || 0;
    return (
      <a href="/mycarts">
        {' '}
        <span
          className="fa-stack  mr-xs-2"
          style={{fontSize: '1.25em', marginTop: '-0.2em'}}>
          <i className="fa fa-shopping-cart fa-stack-1x text-white" />
          <span
            key={this.props.products}
            className="fa fa-stack-1x text-warning"
            style={{
              marginTop: '-0.5em',
              marginLeft: '0.5em',
              fontSize: '.8em',
            }}>
            {quant > 0 ? (
              <div>
                <i className="fa fa-stack-1x fa-circle" />
                <i className="fa fa-stack-1x fa-inverse text-dark">{quant}</i>
              </div>
            ) : (
              ''
            )}
          </span>
        </span>{' '}
      </a>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products,
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    null, null,{pure:false}
  )(ShopCart),
);
