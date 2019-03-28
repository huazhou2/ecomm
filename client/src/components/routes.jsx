import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Main from './main.jsx';
import Product from './product.jsx';
import Login from './login.jsx';
import Register from './register.jsx';
import Admin from './admin.jsx';
import Logout from './logout.jsx';
import Header from './header.jsx';
import ScrollUp from './scrollup.jsx';
import data from '../data/massagedata.json';

class Routes extends Component {

  render() {
    return (
        <div>
	<Switch>
		<Route path="/(login|register)" />
		<Route path='/' render={()=> <Header data={data}/> }/>
	</Switch>
	
		<Switch>
			<Route exact path="/" render={() =>  
					<Main data={data} /> } />
            <Route
              path="/groups/:id1"
	      render={({match}) => (
                <Main
                  match={match}
                  data={data.filter(item => item.group2 === match.params.id1)}
                />
              )}
            />
            <Route
              path="/products/:id1"
              render={({match}) => (
                <Product
                  match={match}
                  data={data.filter(item => item.name === match.params.id1)}
                />
              )}
            />
            <Route exact path="/login" render={() => <Login data={data} />} />
            <Route exact path="/logout" render={() => <Logout data={data} />} />
            <Route
              exact
              path="/register"
              render={() => <Register data={data} />}
            />
            <Route path="/admin" render={() => <Admin/>} />
    </Switch>
    <Route render={()=><ScrollUp scrollStepInPx="50" delayInMs="16.66"/>} />
  </div>
    );
  }
}


export default Routes;
