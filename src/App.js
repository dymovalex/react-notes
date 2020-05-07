import React, { useContext, useEffect, useRef } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Header from './components/header/header.component';
import Content from './components/content/content.component';
import SignInAndSignUp from './components/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Footer from './components/footer/footer.component';

import SignInAndSignUpProvider from './providers/sign-in-and-sign-up/sign-in-and-sign-up.provider';
import NotebookProvider from './providers/notebook/notebook.provider';
import SidebarProvider from './providers/sidebar/sidebar.provider';
import { UserContext } from './providers/user/user.provider';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import './App.scss';

const App = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  let unsubscribeFromAuth = useRef(null);

  useEffect(() => {
    console.log('App is mounting', currentUser);
    unsubscribeFromAuth.current = auth.onAuthStateChanged(async userAuth => {
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
    return () => {
      unsubscribeFromAuth();
    }
  }, []);

  return (
    <div className='app-container'>
      <SidebarProvider>
        <Header />
        <Switch>
          <NotebookProvider>
            <Route exact path='/' component={Content} />
            <Route
              path='/signin'
              render={() =>
                currentUser ? (
                  <Redirect to='/' />
                ) : (
                    <SignInAndSignUpProvider>
                      <SignInAndSignUp />
                    </SignInAndSignUpProvider>
                  )
              }
            />
          </NotebookProvider>
        </Switch>
      </SidebarProvider>
      <Footer />
    </div>
  );
}

export default App;