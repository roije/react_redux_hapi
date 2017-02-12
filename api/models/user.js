/**
 * Created by roije on 2/12/17.
 */

//Initialized bookshelf
const bookshelf = require('../bookshelf');

module.exports = bookshelf.Model.extend({
  tableName: 'users'
})