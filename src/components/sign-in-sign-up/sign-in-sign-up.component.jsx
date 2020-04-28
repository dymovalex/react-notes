import React from 'react';

import './sign-in-sign-up.styles.scss';
import SignIn from '../sign-in/sign-in.component';
import SignUp from '../sign-up/sign-up.component';

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

  handleResize = () => {
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
  }

  singInSignUpSwitcher = () => {
    this.setState({
      signInIsShown: !this.state.signInIsShown
    });
  }

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