/**
 * Created by roije on 2/6/17.
 */
import React from 'react';
import { connect } from 'react-redux';
import { userSignupRequest } from '../../actions/signupActions';

import SignupForm from './SignupForm';

class SignupPage extends React.Component{
  render() {

    const { userSignupRequest } = this.props;

    return(
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <SignupForm userSignupRequest={userSignupRequest}/>
        </div>
      </div>
    )
  }
}

//Requires to receive props
SignupPage.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired
}

export default connect(
  null, { userSignupRequest })(SignupPage);