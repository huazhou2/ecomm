import React, {Component} from 'react';
import {withRouter} from 'react-router';

class Group extends Component {
  prodMain = id1 => {
    const {data} = this.props;
    const data2 = data.filter(c => c.group2 === id1);
    const contents = [];
    var content = [];
    data2.forEach(function(item, i) {
      content.push('/static/' + item.linkimg);
	    if (i>1 && i % 4 === 3) {
        contents.push(content);
        content = [];
      }
    });
    contents.push(content);
    return contents;
  };
  render() {
    const {id1} = this.props.match.params;
    const contents = this.prodMain(id1);
    return (
      <div className="center_body">
        {contents.reverse().map((item,i) => (
          <div className="row" key={i}>
            {item.reverse().map((item2,j) => (
              <div className="col-sm-3" key={j}>
                <img src={item2} alt="noimg" key={j} />
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
}
export default withRouter(Group);
