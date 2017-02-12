/**
 * Created by roije on 2/12/17.
 */
const knex = require('knex');
const bookshelf = require('bookshelf');
var knexConfig = require('../knexfile');

module.exports =  bookshelf(knex(knexConfig.development));