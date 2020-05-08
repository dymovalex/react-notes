import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import SignIn from '../sign-in/sign-in.component';
import SignUp from '../sign-up/sign-up.component';

import { handleResize } from '../../redux/sign-in-and-sign-up/sign-in-and-sign-up.actions';
import { selectMobileView, selectSignInIsShown } from '../../redux/sign-in-and-sign-up/sign-in-and-sign-up.selectors';

import { debounce } from '../../redux/notebook/notebook.utils';

import './sign-in-and-sign-up.styles.scss';

class SignInAndSignUp extends React.Component {

  componentDidMount() {
    window.addEventListener('resize', this.props.handleResize);
    this.props.handleResize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.props.handleResize);
  }

  render() {
    const { mobileView, signInIsShown } = this.props;

    return (
      <div className='sign-in-and-sign-up'>
        {
          !mobileView ?
            <React.Fragment>
              <SignIn />
              <SignUp />
            </React.Fragment> :

            signInIsShown ?
              <SignIn /> :
              <SignUp />
        }
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  mobileView: selectMobileView,
  signInIsShown: selectSignInIsShown,
});

const mapDispatchToProps = dispatch => {
  const debouncedHandleResize = debounce(() => dispatch(handleResize()), 200);
  return () => ({ handleResize: debouncedHandleResize });
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInAndSignUp);