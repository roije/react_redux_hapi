/**
 * Created by roije on 2/6/17.
 */
const validateInput = require('./helpers/validateSignUp');

module.exports = [

  //User signup
  {
    method: 'POST',
    path: '/api/users',
    handler: (request, reply) => {
      const validate = validateInput(request.payload);

      if(!validate.isValid) {
        reply(validate.errors).code(400);
      }
    }
  }
]