import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';

class Main extends Component {
  prodMain(col_num) {
    const {data} = this.props;
    const contents = [];
    var content = [];
    data.forEach((item, i) => {
      content.push('/static/' + item.linkimg);
      if (i > 1 && i % col_num === col_num - 1) {
        contents.push(content);
        content = [];
      }
    });
    contents.push(content);
    return contents;
  }

  render() {
    const dataimg = this.prodMain(4);
    return (
      <div className="center_body">
        {dataimg.reverse().map((item,i) => (
          <div className="row" key={i}>
            {item.reverse().map((item2,j) => (
              <div className="col-sm-3">
                <img src={item2} key={j} alt="noimg" />
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
}

export default Main;
