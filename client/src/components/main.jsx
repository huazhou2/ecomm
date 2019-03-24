import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';

class Main extends Component {
 
  prodMain(col_num) {
    const {data} = this.props;
    const contents = [];
    var content = [];
    data.forEach((item, i) => {
      content.push({link:'/static/' + item.linkimg,name: item.item});
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
        {dataimg.map((item,i) => (
          <div className="row" key={i}>
            {item.map((item2,j) => (
              <div className="col-sm-3 card text-center px-1 mb-2" key={j}>
		  <a className='d-flex flex-column flex-fill' href={`/products/${item2.name}`}>    <div className='card-body'> 
                <img id='thum_img' src={item2.link}  alt="noimg" />
	</div>
	
	<div className='mt-auto card-footer bg-success'>
		<h3>{item2.name}</h3>
	</div>
	</a>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
}

export default Main;
