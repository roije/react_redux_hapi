/**
 * Created by roije on 2/6/17.
 */
const isEmpty = require('lodash/isEmpty');
const validator = require('validator');

module.exports = function validateInput(data) {
  var errors = {};

  if(validator.isEmpty(data.username)){
    errors.username = 'This field is required';
  }

  if (validator.isEmpty(data.email)){
    errors.email = 'This field is required';
  }
  if(!validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }
  if (validator.isEmpty(data.password)){
    errors.password = 'This field is required';
  }
  if (validator.isEmpty(data.passwordConfirmation)){
    errors.passwordConfirmation = 'This field is required';
  }
  if(!validator.equals(data.password, data.passwordConfirmation)){
    errors.passwordConfirmation = 'Passwords must match'
  }
  if (validator.isEmpty(data.timeZone)){
    errors.timeZone = 'This field is required';
  }

  return {
    errors,
    isValid : isEmpty(errors)
  }
}