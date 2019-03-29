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
  carousel_img = pics => {
    return (
        <div id="caras" className="carousel slide" data-ride="carousel">
          <div className="carousel-inner">
            {pics.map((item, j) => (
              <div className={`carousel-item ${j === 0 ? 'active' : ''}`}>
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
            <span class="carousel-control-prev-icon" />
          </a>
          <a
            className="carousel-control-next d-none"
            href="#caras"
            data-slide="next">
            <span class="carousel-control-next-icon" />
          </a>
        </div>
    );
  };

  render() {
    const {data} = this.props;
    const item = data[0];
    const items = [item, item, item];
    console.log(items);
    return (
      <div className="center_body">
        <div className="row bg-light">
          <div className="d-flex flex-column col-sm-7 card bg-light text-center flex-fill">
            <div className="card-body px-1">{this.carousel_img(items)}</div>

            <div className="card-footer bg-light d-flex justify-content-around my-3">
              <h3>Price: ${item.price}</h3>
            <button type="submit" className="btn btn-primary">
             Add to Cart 
            </button>
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
