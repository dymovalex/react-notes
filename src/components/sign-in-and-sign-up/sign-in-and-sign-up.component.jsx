import React from 'react';

import SignIn from '../sign-in/sign-in.component';
import SignUp from '../sign-up/sign-up.component';

import { debounce } from '../note/note.utils';

import './sign-in-and-sign-up.styles.scss';

class SignInAndSignUp extends React.Component {
  constructor() {
    super();

    this.state = {
      mobileView: false,
      signInIsShown: true,
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = debounce(() => {
    console.log('Resizing!')
    if (!this.state.mobileView && window.innerWidth < 910) {
      this.setState({
        mobileView: true
      });
    }
    if (this.state.mobileView && window.innerWidth >= 910) {
      this.setState({
        mobileView: false
      });
    }
  }, 200);

  singInSignUpSwitcher = () => {
    this.setState(state => ({
      signInIsShown: !state.signInIsShown
    }));
  };

  render() {
    return (
      <div className='sign-in-and-sign-up'>
        {
          !this.state.mobileView ?
            <React.Fragment>
              <SignIn mobileView={this.state.mobileView} />
              <SignUp mobileView={this.state.mobileView} />
            </React.Fragment> :

            this.state.signInIsShown ?
              <SignIn mobileView={this.state.mobileView} singInSignUpSwitcher={this.singInSignUpSwitcher} /> :
              <SignUp mobileView={this.state.mobileView} singInSignUpSwitcher={this.singInSignUpSwitcher} />
        }
      </div>
    );
  }
}

export default SignInAndSignUp;