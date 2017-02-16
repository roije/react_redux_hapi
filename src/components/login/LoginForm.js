/**
 * Created by roije on 2/15/17.
 */
import React, { Component } from 'react'
import TextFieldGroup from '../signup/common/TextFieldGroup';
import validateInput from '../../../api/shared/validations/validateLogin';
import { connect } from 'react-redux';
import { login } from '../../actions/authActions';

class LoginForm extends Component {

  constructor(props){
    super(props);

    this.state = {
      identifier: '',
      password: '',
      errors: {},
      isLoading: false
    }

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  isValid(){
    const { errors, isValid} = validateInput(this.state);

    if(!isValid) {
      this.setState({
        errors
      })
    }

    return isValid;
  }

  onSubmit(e) {
    e.preventDefault();

    if(this.isValid()) {
      this.setState({
        errors: {},
        isLoading: true
      })
      this.props.login(this.state).then(
        (res) => this.context.router.push('/'),
        (err) => this.setState({ errors: err.data.errors, isLoading: false })

      );
    }
  }

  onChange(e){
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  render()
  {
    const { errors, identifier, password, isLoading} = this.state;

    return(
      <form onSubmit={this.onSubmit}>
        <h1>Login</h1>

        { errors.form && <div className="alert alert-danger">{errors.form}</div> }

        <TextFieldGroup
          field="identifier"
          value={identifier}
          label="Username / Email"
          error={errors.identifier}
          onChange={this.onChange}/>

        <TextFieldGroup
          field="password"
          value={password}
          label="Password"
          error={errors.password}
          onChange={this.onChange}
          type="password"
        />

        <div className="form-group">
          <button type="submit" className="btn btn-primary btn-lg" disabled={isLoading}>
            Login
          </button>
        </div>

      </form>
    )
  }
}

LoginForm.PropTypes = {
  login: React.PropTypes.func.isRequired
}

LoginForm.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default connect(null, { login })(LoginForm);