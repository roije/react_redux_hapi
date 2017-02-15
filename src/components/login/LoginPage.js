/**
 * Created by roije on 2/15/17.
 */
import React, { Component } from 'react'

import LoginForm from './LoginForm';

class LoginPage extends Component {
  render() {
    return(
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <LoginForm />
        </div>
      </div>
    )
  }
}

export default LoginPage;