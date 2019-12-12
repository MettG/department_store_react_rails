import React, { Fragment, } from 'react';
import { Route, Switch, } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import NoMatch from './components/NoMatch';
import Navbar from './components/Navbar';
import { Container, } from "semantic-ui-react";
import Departments from './components/DepartmentList';
import Department from './components/Department';
import DepartmentNew from './components/DepartmentNew';
const App = () => (
  <Fragment>
		<Navbar />
    <Container>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
				<Route exact path="/departments" component={Departments} />
				<Route exact path='/departments/new' component={DepartmentNew}/>
				<Route exact path="/departments/:id" component={Department}/>
        <Route component={NoMatch} />
      </Switch>
    </Container>
  </Fragment>
);

export default App;
