import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';

class Product extends Component {
  render() {
    const {data} = this.props;
    const item = data[0];
    return (
      <div className="center_body">
        <div className="row h-100">
          <div className="col-sm-7 card border-primary text-center">
            <div className="card-body">
              <img id='full_img' src={`/static/${item.linkimg}`} alt="noimg" />
            </div>

            <div className="card-footer bg-success">
              <h3>{item.item}</h3>
            </div>
          </div>
          <div className="col-sm-1" />
          <div className="col-sm-4 card border-primary text-center">
            <div className="card-body">
              <h3>{item.item}</h3>
              <p> description here</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Product;
