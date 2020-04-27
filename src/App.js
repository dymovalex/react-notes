import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from './components/header/header.component';
import Content from './components/content/content.component';
import SignIn from './components/sign-in/sign-in.component';

import { auth, signInWithGoogle, createUserProfileDocument } from './firebase/firebase.utils';

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
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapshot => {
          this.setState({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data()
            }
          });
        })
      }

      this.setState({ currentUser: userAuth });

      console.log(this.state.currentUser);
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  clearApp = () => {

  }

  render() {
    return (
      <div className='app-container'>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path='/' render={() => <Content currentUser={this.state.currentUser} />} />
          <Route path='/signin' render={() => <SignIn signInWithGoogle={signInWithGoogle} />} />
        </Switch>
      </div>
    );
  }
}

export default App;