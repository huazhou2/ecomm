import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';


class ScrollUp extends Component {
  constructor() {
    super();

    this.state = {
        intervalId: 0
    };
  }
  
  scrollStep() {
    if (window.pageYOffset === 0) {
        clearInterval(this.state.intervalId);
    }
    window.scroll(0, window.pageYOffset - this.props.scrollStepInPx);
  }
  
  scrollToTop() {
    let intervalId = setInterval(this.scrollStep.bind(this), this.props.delayInMs);
    this.setState({ intervalId: intervalId });
  }
  
  render () {
	  
	  console.log(window.scrollY);
	  return window.scrollY >800 &&  <button title='Back to top' className='scroll' 
               onClick={ () => { this.scrollToTop(); }}>
                <i className='fa fa-arrow-up fa-2x text-primary'></i>
              </button>;
   }

};

export default ScrollUp;
