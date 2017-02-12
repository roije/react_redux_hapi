/**
 * Created by roije on 2/6/17.
 */
const validateInput = require('./shared/validations/validateSignUp');
const bcrypt = require('bcrypt');
const User = require('./models/user');
module.exports = [

  //User signup
  {
    method: 'POST',
    path: '/api/users',
    handler: (request, reply) => {
      const validate = validateInput(request.payload);

      if(validate.isValid) {
        var username = request.payload.username;
        var password = request.payload.password;
        var timezone = request.payload.timeZone;
        var email = request.payload.email;
        const password_digest = bcrypt.hashSync(password, 10);

        User.forge({
          username, timezone, email, password_digest
        }, { hasTimestamps : true}).save()
          .then(user => reply({ success : true}).code(200))
          .catch(err => reply({ error: err}).code(500))
      }
      else {
        reply(validate.errors).code(400);
      }
    }
  }
]