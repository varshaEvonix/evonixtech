/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var bcrypt = require('bcrypt');
var uuid = require('node-uuid');

module.exports = {

  schema:true,

  attributes  : {
    
    student_login_credential_id  : 
    {
      type: 'integer',
      primaryKey:true
    },
    student_id  : 
    {
      type: 'string',
      required: true
    },
    student_email     : 
    {
      type: 'email',
      required: true
    },
    student_password   : 
    {
      type: 'string',
      required: true,
      minLength: 6,
      maxLength: 50
    },
    student_active  : 
    {
      type: 'string',
      required: true
    },
    student_city  : 
    {
      type: 'string',
      required: true
    }
  },
 beforeCreate: function (values, next) {
 	require('bcrypt').hash(values.password, 10, function password_student(err, student_password){
 		if(err) return next(err);
 		values.student_password = student_password;
 		next();

 	});
   
 
}
  
 
};


