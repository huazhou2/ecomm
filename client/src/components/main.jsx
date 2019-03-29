import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';

class Main extends Component {
 
  prodMain(col_num) {
    const {data} = this.props;
    const contents = [];
    var content = [];
    data.forEach((item, i) => {
      content.push({link:'/static/' + item.linkimg,name: item.name, desc: item.price});
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
              <div  className="container col-xs-12 col-sm-3 col-md-2 text-center mx-1 mb-3" key={j}>
		  <a  className='d-block d-flex flex-xs-row flex-sm-column justify-content-start justify-content-sm-between align-items-center h-100 bg-light border-bottom' style={{textDecoration:'none'}} href={`/products/${item2.name}`}>   
                <img id='thum_img' src={item2.link}  alt="noimg"/>
	
		<span className='flex-grow-1 flex-sm-grow-0' > <h4> {item2.name}</h4>  Price ${item2.desc} </span>


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
