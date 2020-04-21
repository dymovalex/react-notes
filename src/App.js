import React from 'react';

import HeaderComponent from './components/header/header.component';
import ContentComponent from './components/content/content.component';


import { auth } from './firebase/firebase.utils';

import './App.scss';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: 'Alex',
    };
  }

  render() {
    return (
      <div className='app-container'>
        <HeaderComponent currentUser={this.state.currentUser} />
        <ContentComponent />
      </div>
    );
  }
}

export default App;