/**
 * Created by roije on 2/6/17.
 */
const commonValidations = require('./shared/validations/validateSignUp');
const bcrypt = require('bcrypt');
const User = require('./models/user');
const isEmpty = require('lodash/isEmpty')
const jwt = require('jsonwebtoken');
const config = require('../config')

function validateInput(data, otherValidations) {
  var errors = otherValidations(data).errors;

  return User.query({
    where: {email : data.email},
    orWhere: {username: data.username}
  }).fetch().then(user => {
    if(user){
      if(user.get('username') == data.username) {
        errors.username = 'There is a user with such username'
      }
      if(user.get('email') == data.email) {
        errors.email = 'There is a user with such email'
      }
    }
    return {
      errors,
      isValid: isEmpty(errors)
    }
  })
}

module.exports = [

  //User signup
  {
    method: 'POST',
    path: '/api/users',
    config: {
      handler: (request, reply) => {
        validateInput(request.payload, commonValidations).then(( validate ) => {
          if (validate.isValid) {
            var username = request.payload.username;
            var password = request.payload.password;
            var timezone = request.payload.timeZone;
            var email = request.payload.email;
            const password_digest = bcrypt.hashSync(password, 10);

            User.forge({
              username, timezone, email, password_digest
            }, {hasTimestamps: true}).save()
              .then(user => reply({success: true}).code(200))
              .catch(err => reply({error: err}).code(500))
          }
          else {
            reply(validate.errors).code(400);
          }
        });
      },
      description: 'User sign up',
      notes: 'Saves user in database if successfull and replies with "Success" or "Error" message',
      tags: ['api']
    }
  },

  {
    method: 'GET',
    path: '/api/users/{identifier}',
    config: {
      handler: (request, reply) => {
        User.query({
          select: ['username', 'email'],
          where: {email : request.params.identifier},
          orWhere: {username: request.params.identifier}
        }).fetch().then(user => {
          reply({ user });
        })
      }
    }
  },

  {
    method: 'POST',
    path: '/api/auth',
    config: {
      handler: (request, reply) => {
        const identifier = request.payload.identifier;
        const password = request.payload.password;

        User.query({
          where: { username: identifier},
          orWhere: { email: identifier}
        }).fetch().then(user => {
          if(user) {
            if(bcrypt.compareSync(password, user.get('password_digest'))){

              //Sign takes two arguements.
              //The first on is a payload. Something we can decode on the client
              //Dont give the payload object any private information
              //The second argument is the secret (env.JWT_SECRET)
              const token = jwt.sign({
                id: user.get('id'),
                username: user.get('username')
              }, config.jwtSecret);

              reply({ token });
            }
            else{
              reply({ errors: { form: 'Invalid credentials'}}).code(401)
            }
          }
          else{
            reply({ errors: { form: 'Invalid credentials'}}).code(401)
          }
        })
      }
    }
  }

]