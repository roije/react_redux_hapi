/**
 * Created by roije on 2/6/17.
 */
import React from 'react';
import timezones from '../../data/timezones';
import map from 'lodash/map';
import classnames from 'classnames';
import validateInput from '../../../api/shared/validations/validateSignUp';
import TextFieldGroup from './common/TextFieldGroup';

import { connect } from 'react-redux';
import { userSignupRequest, isUserExists } from '../../actions/signupActions';
import { addFlashMessage }from '../../actions/flashMessages';

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
      isLoading: false,
      invalid: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.checkUserExists = this.checkUserExists.bind(this);
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
    e.preventDefault();

    if(this.isValid()) {
      this.setState({errors: {}, isLoading: true});
      this.props.userSignupRequest(this.state).then(
        () => {
          this.props.addFlashMessage({
            type: 'Success',
            text: 'You have signed up successfully. Welcome'
          });
          this.context.router.push('/');
        },
        ({data}) => this.setState({errors: data, isLoading: false})
      )
    }
  }

  checkUserExists(e) {

    const field = e.target.name;
    const val = e.target.value;

    if(val !== '') {
      this.props.isUserExists(val).then(res => {
        var errors = this.state.errors;
        var invalid;
        if(res.data.user) {
          errors[field] = 'There is a user with such ' + field;
          invalid = true;
        } else {
          errors[field] = '';
          invalid = false;
        }
        this.setState({ errors, invalid })
      })
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
          onChange={this.onChange}
          checkUserExists={this.checkUserExists}
        />

        <TextFieldGroup
          field="email"
          value={this.state.email}
          label="Email"
          error={errors.email}
          type="email"
          onChange={this.onChange}
          checkUserExists={this.checkUserExists}
        />

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
          <button disabled={this.state.isLoading || this.state.invalid} className="btn btn-primary btn-lg">Sign up</button>
        </div>
      </form>
    )


  }
}

//Requires to receive props
SignupForm.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired,
  isUserExists: React.PropTypes.func.isRequired
}

SignupForm.contextTypes = {
  router: React.PropTypes.object.isRequired
}

//2nd parameter is mapDispatchToProps
export default connect(
  null, { userSignupRequest, addFlashMessage, isUserExists })(SignupForm);


/*
 <Ingredient name={ingredient.NAME}
 clnt_id={ingredient.CLNT_ID}
 human_id={ingredient.HUMANID}
 description={ingredient.DESCRIPTION}
 group_id={ingredient.GROUPID}
 frida_id={ingredient.FRIDA_ID}
 />
 */