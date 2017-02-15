/**
 * Created by roije on 2/6/17.
 */
import React from 'react';
import { connect } from 'react-redux';
import { userSignupRequest, isUserExists } from '../../actions/signupActions';
import { addFlashMessage }from '../../actions/flashMessages';

import SignupForm from './SignupForm';

class SignupPage extends React.Component{
  render() {


    return(
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <SignupForm />
        </div>
      </div>
    )
  }
}

export default SignupPage;