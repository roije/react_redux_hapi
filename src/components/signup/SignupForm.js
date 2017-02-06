/**
 * Created by roije on 2/6/17.
 */
import React from 'react';
import timezones from '../../data/timezones';
import map from 'lodash/map';
import classnames from 'classnames';

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

  onSubmit(e){
    //Clear errors on submit
    this.setState( { errors: {}, isLoading: true});

    e.preventDefault();
    this.props.userSignupRequest(this.state).then(
      () => {},
      ( {data} ) => this.setState({ errors: data, isLoading: false})
    )
  }

  render() {

    const { errors } = this.state;

    const options = map(timezones, (val, key) =>
      <option key={val} value={val}>{key}</option>
    );

    return(
      <form onSubmit={this.onSubmit}>
        <h1>Join our community</h1>
        <div className={classnames("form-group", {'has-error': errors.username})}>
          <label className="control-label">Username</label>
          <input
            type="text"
            name="username"
            className="form-control"
            value={this.state.username}
            onChange={this.onChange}
          />
          {errors.username && <span className="help-block">{errors.username}</span>}
        </div>

        <div className={classnames("form-group", {'has-error': errors.email})}>
          <label className="control-label">Email</label>
          <input
            type="text"
            name="email"
            className="form-control"
            value={this.state.email}
            onChange={this.onChange}
          />
          {errors.email && <span className="help-block">{errors.email}</span>}
        </div>

        <div className={classnames("form-group", {'has-error': errors.password})}>
          <label className="control-label">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={this.state.password}
            onChange={this.onChange}
          />
          {errors.password && <span className="help-block">{errors.password}</span>}
        </div>

        <div className={classnames("form-group", {'has-error': errors.passwordConfirmation})}>
          <label className="control-label">Password confirm</label>
          <input
            type="password"
            name="passwordConfirmation"
            className="form-control"
            value={this.state.passwordConfirmation}
            onChange={this.onChange}
          />
          {errors.passwordConfirmation && <span className="help-block">{errors.passwordConfirmation}</span>}
        </div>

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