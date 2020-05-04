import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './components/header/header.component';
import Content from './components/content/content.component';
import SignInAndSignUp from './components/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Footer from './components/footer/footer.component';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import './App.scss';

import { setCurrentUser } from './redux/user/user.actions';
import { toggleSidebar } from './redux/sidebar/sidebar.actions';

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapshot => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          });
        })
      } else {
        setCurrentUser(userAuth);
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    const { currentUser, sidebarIsClosed, toggleSidebar } = this.props;

    return (
      <div className='app-container'>
        <Header toggleSidebar={toggleSidebar} />
        <Switch>
          <Route
            exact
            path='/'
            render={() =>
              <Content
                currentUser={currentUser}
                sidebarIsClosed={sidebarIsClosed}
                toggleSidebar={toggleSidebar}
              />
            }
          />
          <Route
            path='/signin'
            render={() =>
              currentUser ? (
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

const mapStateToProps = ({ user, sidebar }) => ({
  currentUser: user.currentUser,
  sidebarIsClosed: sidebar.isClosed,
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  toggleSidebar: () => dispatch(toggleSidebar()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);