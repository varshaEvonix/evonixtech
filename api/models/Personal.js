/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  schema:true,

  attributes  : {
  	user_id : 
    {
      type: 'string'
    },
    name : 
    {
      type: 'string',
      required: true
    },
    age  : 
    {
      type: 'string',
      required: true
    },
    city     : 
    {
      type: 'string',
      required: true
    },
    about   : 
    {
      type: 'string',
      required: true
    },
    address  : 
    {
      type: 'string',
      required: true
    },
    email  : 
    {
      type: 'email',
      required: true
    },
    occupation  : 
    {
      type: 'string',
      required: true
    }
  }

  
 
};