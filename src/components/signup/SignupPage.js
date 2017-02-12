/**
 * Created by roije on 2/6/17.
 */
import React from 'react';
import { connect } from 'react-redux';
import { userSignupRequest } from '../../actions/signupActions';
import { addFlashMessage }from '../../actions/flashMessages';

import SignupForm from './SignupForm';

class SignupPage extends React.Component{
  render() {

    const { userSignupRequest, addFlashMessage } = this.props;

    return(
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <SignupForm userSignupRequest={userSignupRequest} addFlashMessage={addFlashMessage}/>
        </div>
      </div>
    )
  }
}

//Requires to receive props
SignupPage.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired
}

//2nd parameter is mapDispatchToProps
export default connect(
  null, { userSignupRequest, addFlashMessage })(SignupPage);