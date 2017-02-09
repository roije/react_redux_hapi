/**
 * Created by roije on 2/6/17.
 */
import React from 'react';
import timezones from '../../data/timezones';
import map from 'lodash/map';
import classnames from 'classnames';
import validateInput from '../../../api/shared/validations/validateSignUp';
import TextFieldGroup from './common/TextFieldGroup';

class SignupForm extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email:'',
      password: '',
      passwordConfirmation: '',
      timeZone: '',
      errors: {},
      isLoading: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  isValid(){
    const { errors, isValid } = validateInput(this.state);

    if(!isValid){
      this.setState({errors})
    }

    return isValid;
  }

  onSubmit(e){
    //Clear errors on submit
    e.preventDefault();

    if(this.isValid()) {
      this.setState({errors: {}, isLoading: true});
      this.props.userSignupRequest(this.state).then(
        () => {
        },
        ({data}) => this.setState({errors: data, isLoading: false})
      )
    }
  }


  render() {

    const { errors } = this.state;

    const options = map(timezones, (val, key) =>
      <option key={val} value={val}>{key}</option>
    );

    return(
      <form onSubmit={this.onSubmit}>
        <h1>Join our community</h1>

        <TextFieldGroup
          field="username"
          value={this.state.username}
          label="Username"
          error={errors.username}
          type="text"
          onChange={this.onChange}/>

        <TextFieldGroup
          field="email"
          value={this.state.email}
          label="Email"
          error={errors.email}
          type="email"
          onChange={this.onChange}/>

        <TextFieldGroup
          field="password"
          value={this.state.password}
          label="Password"
          error={errors.password}
          type="password"
          onChange={this.onChange}/>

        <TextFieldGroup
          field="passwordConfirmation"
          value={this.state.passwordConfirmation}
          label="Password confirm"
          error={errors.passwordConfirmation}
          type="password"
          onChange={this.onChange}/>

        <div className={classnames("form-group", {'has-error': errors.timeZone})}>
          <label className="control-label">Time zone</label>
          <select
            type="text"
            name="timeZone"
            className="form-control"
            value={this.state.timeZone}
            onChange={this.onChange}
          >
            <option value="" disabled="">Choose your Timezone</option>
            {options}
          </select>
          {errors.timeZone && <span className="help-block">{errors.timeZone}</span>}
        </div>

        <div className="form-group">
          <button disabled={this.state.isLoading} className="btn btn-primary btn-lg">Sign up</button>
        </div>
      </form>
    )
  }
}

//Requires to receive props
SignupForm.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired
}

export default SignupForm;