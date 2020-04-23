import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from './components/header/header.component';
import Content from './components/content/content.component';
import SignIn from './components/sign-in/sign-in.component';


import { auth, signInWithGoogle } from './firebase/firebase.utils';

import './App.scss';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null,
    };
  }
  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      this.setState({ currentUser: user });

      console.log(user);
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div className='app-container'>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path='/' component={Content} />
          <Route path='/signin' render={() => <SignIn signInWithGoogle={signInWithGoogle} />} />
        </Switch>
      </div>
    );
  }
}

export default App;