import React, {Component} from 'react';
import Main from './main.jsx';

class SearchRes extends Component {
  render() {
    const {data, match} = this.props;
    var curword = match.params.id1.replace(/\s+/, ' ');
	  curword=curword.trim();
	  console.log('curword is ',curword);

    let words = curword.split(/\s+/);
    words.splice(0, 0, curword);
    const reg = words.join('|');
    let regex = new RegExp(`${reg}`, 'gi');
    var data_res = data.filter(item => regex.test(item.name));
    return data_res.length === 0 ? (
	    <h3 className='center_body text-danger my-auto'>Your search term <strong className='text-bold'>'{curword}'</strong> didnt return anything!</h3>
    ) : (
      <Main data={data_res} />
    );
  }
}
export default SearchRes;
