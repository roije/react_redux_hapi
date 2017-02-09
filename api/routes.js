/**
 * Created by roije on 2/6/17.
 */
const validateInput = require('./shared/validations/validateSignUp');

module.exports = [

  //User signup
  {
    method: 'POST',
    path: '/api/users',
    handler: (request, reply) => {
      const validate = validateInput(request.payload);

      if(validate.isValid) {
        reply({ success: true}).code(200);
      }
      else {
        reply(validate.errors).code(400);
      }
    }
  }
]