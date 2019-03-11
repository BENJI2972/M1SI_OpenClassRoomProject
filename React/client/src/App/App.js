import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import List from './pages/List';
import User from './pages/User';
import LessonList from './pages/LessonList';
import LessonDetail from './pages/LessonDetail';
import connexion from './pages/login';

class App extends Component {
  render() {
    const App = () => (
      <div>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/list' component={List}/>
		      <Route path='/user' component={User}/>
		      <Route path='/lessonlist' component={LessonList}/>
		      <Route path='/lessondetail/:lesson_id/:chapter_id' component={LessonDetail}/>
          <Route path='/user/:id' component={User}/>
          <Route path='/connexion' component={connexion}/>
        </Switch>
      </div>
    )
    return (
      <Switch>
        <App/>
      </Switch>
    );
  }
}
export default App;
