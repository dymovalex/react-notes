import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Header from './components/header/header.component';
import Content from './components/content/content.component';
import SignInAndSignUp from './components/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Footer from './components/footer/footer.component';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import './App.scss';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null,
      sidebarIsClosed: true,
    };
  }

  unsubscribeFromAuth = null;

  toggleSidebar = () => {
    this.setState(state => ({
      sidebarIsClosed: !state.sidebarIsClosed
    }));
  }

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
      } else {
        this.setState({ currentUser: userAuth });
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div className='app-container'>
        <Header currentUser={this.state.currentUser} toggleSidebar={this.toggleSidebar} />
        <Switch>
          <Route
            exact
            path='/'
            render={() =>
              <Content
                currentUser={this.state.currentUser}
                sidebarIsClosed={this.state.sidebarIsClosed}
                toggleSidebar={this.toggleSidebar}
              />
            }
          />
          <Route
            path='/signin'
            render={() =>
              this.state.currentUser ? (
                <Redirect to='/' />
              ) : (
                  <SignInAndSignUp />
                )
            }
          />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;