import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';

class Main extends Component {
 
  prodMain(col_num) {
    const {data} = this.props;
    const contents = [];
    var content = [];
    data.forEach((item, i) => {
      content.push({link:'/static/' + item.linkimg,name: item.name});
      if (i > 1 && i % col_num === col_num - 1) {
        contents.push(content);
        content = [];
      }
    });
    contents.push(content);
    return contents;
  }

  render() {
    const dataimg = this.prodMain(5);
    return (
      <div className="center_body">
        {dataimg.map((item,i) => (
          <div  className="row" key={i}>
            {item.map((item2,j) => (
              <div  className="col-sm-2 card text-center mx-1 mb-3" key={j}>
		  <a id='prodlist' className='flex-fill' href={`/products/${item2.name}`}>   
                <img id='thum_img2' className='d-inline-block float-left' src={item2.link}  alt="noimg" />
	
		<span className='' > Price {item2.name}</span>
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
