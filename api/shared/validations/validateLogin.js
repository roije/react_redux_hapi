/**
 * Created by roije on 2/15/17.
 */
const isEmpty = require('lodash/isEmpty');
const validator = require('validator');

module.exports = function validateInput(data){
  var errors = {};

  if(isEmpty(data.identifier)){
    errors.identifier = 'This field is required';
  }

  if(isEmpty(data.password)) {
    errors.password = 'This field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}