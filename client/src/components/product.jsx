import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';

class Product extends Component {
  /* <ul className="carousel-indicators">
	{pics.map((item, j) => (
          <li
            data-target="#caras"
            data-slide-to={j}
            className={j === 0 ? 'active' : ''}
          />
      </ul>
	))}*/
  constructor(props) {
    super(props);
    this.state = {
      size: props.data[0].size.split(',')[0],
      price: props.data[0].price.split(',')[0],
    };
  }
  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  carousel_img = pics => {
    return (
      <div id="caras" className="carousel slide" data-ride="carousel">
        <div className="carousel-inner">
          {pics.map((item, j) => (
            <div
              key={`img_disp${j}`}
              className={`carousel-item ${j === 0 ? 'active' : ''}`}>
              <img
                id="full_img"
                className="img-fluid"
                src={`/static/${item.linkimg}`}
                alt={item.name}
              />
            </div>
          ))}
        </div>
        <ul className="carousel-indicators">
          {pics.map((item, j) => (
            <li
              key={`indicator${j}`}
              data-target="#caras"
              data-slide-to={j}
              className={`${j === 0 ? 'active' : ''}`}>
              <img
                className="img-responsive"
                src={`/static/${item.linkimg}`}
                alt={item.item}
              />
            </li>
          ))}
        </ul>

        <a
          className="carousel-control-prev d-none"
          href="#caras"
          data-slide="prev">
          <span className="carousel-control-prev-icon" />
        </a>
        <a
          className="carousel-control-next d-none"
          href="#caras"
          data-slide="next">
          <span className="carousel-control-next-icon" />
        </a>
      </div>
    );
  };

  prod_disp = item => {
    return (
      <form className="text-left">
        <label>Select a Color</label>
        <select
          id="size"
          name="size"
          className="form-control mb-1"
          onChange={this.handleInputChange}
          value={this.state.size}>
          {item.color.split(',').map((prod, j) => (
            <option value={prod} key={j}>
              {prod}
            </option>
          ))}
        </select>
        <label>Select a Size</label>
        <select
          id="size"
          name="size"
          className="form-control mb-1"
          onChange={this.handleInputChange}
          value={this.state.color}>
          {item.size.split(',').map((prod, j) => (
            <option value={prod} key={j}>
              {prod}
            </option>
          ))}
        </select>
      </form>
    );
  };

  render() {
    const {data} = this.props;
    const item = data[0];
    const items = [item, item, item];
    return (
      <div className="center_body">
        <div className="row bg-light">
          <div className="d-flex flex-column col-sm-7 card bg-light text-center">
            <div className="card-body px-1">{this.carousel_img(items)}</div>
            <div className="card-footer bg-light d-flex flex-column justify-content-around my-3">
              {this.prod_disp(item)}
              <div className="row d-flex justify-content-between mt-2">
                <h3>Price: ${parseFloat(item.price.split(','))}</h3>
                <button type="submit" className="btn btn-primary">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
          <div className="col-sm-1" />
          <div className="col-sm-4 card bg-light text-center">
            <div className="card-footer">
              <h3>{item.name}</h3>
              <p> {item.description}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Product;
